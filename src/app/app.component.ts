import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'dogs-multiverse-app';
	auth = new FirebaseTSAuth();

	constructor(private loginSheet: MatBottomSheet,
		private router: Router) {
		this.auth.listenToSignInStateChanges(
			user => {
				this.auth.checkSignInState(
					{
						whenSignedIn: user => {
						},
						whenSignedOut: user => {
						},
						whenSignedInAndEmailNotVerified: user => {
							this.router.navigate(["emailVerification"])
						},
						whenSignedInAndEmailVerified: user => {

						},
						whenChanged: user => {

						}
					}
				);
			}
		);
	}

	onLogoutClick(){
		this.auth.signOut();
	}

	loggedIn(){
		return this.auth.isSignedIn();
	}

	onLoginClick() {
		this.loginSheet.open(AuthenticatorComponent);
	}
}
