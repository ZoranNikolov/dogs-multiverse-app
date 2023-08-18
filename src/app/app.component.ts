import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'dogs-multiverse-app';
	auth = new FirebaseTSAuth();
	firestore = new FirebaseTSFirestore();
	userHasProfile = true;
	private static userDocument: UserDocument | null = null;

	constructor(private loginSheet: MatBottomSheet, private router: Router) {
		this.auth.listenToSignInStateChanges((user) => {
			this.auth.checkSignInState({
				whenSignedIn: (user) => {},
				whenSignedOut: (user) => {
					AppComponent.userDocument = null;
				},
				whenSignedInAndEmailNotVerified: (user) => {
					this.router.navigate(['emailVerification']);
				},
				whenSignedInAndEmailVerified: (user) => {
					this.getUserProfile();
				},
				whenChanged: (user) => {},
			});
		});
	}
	public static getUserDocument() {
		return AppComponent.userDocument;
	}
	getUsername() {
		return AppComponent.userDocument?.publicName;
	}
	getUserProfile() {
		const currentUser = this.auth.getAuth().currentUser;

		if (currentUser) {
			this.firestore.listenToDocument({
				name: 'Getting Document',
				path: ['Users', currentUser.uid],
				onUpdate: (result) => {
					AppComponent.userDocument = result.exists
						? (result.data() as UserDocument)
						: null;
					this.userHasProfile = result.exists;

					if (AppComponent.userDocument) {
						AppComponent.userDocument.userId = currentUser.uid;
						if (this.userHasProfile) {
							this.router.navigate(['postfeed']);
						}
					}
				},
			});
		} else {
			console.log('No current user');
		}
	}

	onLogoutClick() {
		this.auth.signOut();
	}

	loggedIn() {
		return this.auth.isSignedIn();
	}

	onLoginClick() {
		this.loginSheet.open(AuthenticatorComponent);
	}
}

export interface UserDocument {
	publicName: string;
	description: string;
	userId: string;
}
