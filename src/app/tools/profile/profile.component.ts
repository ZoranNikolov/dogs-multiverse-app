import { Component, Input } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
	@Input() show!: boolean;

	firestore!: FirebaseTSFirestore;
	auth!: FirebaseTSAuth;

	constructor() {
		this.firestore = new FirebaseTSFirestore();
		this.auth = new FirebaseTSAuth();
	}

	onContinueClick(
		nameInput: HTMLInputElement,
		descriptionInput: HTMLTextAreaElement
	) {
		let name = nameInput.value;
		let description = descriptionInput.value;

		const currentUser = this.auth.getAuth().currentUser;
		if(currentUser){
			this.firestore.create(
				{
					path: ["Users", currentUser.uid],
					data: {
						publicName: name,
						description: description
					},
					onComplete: (docId) => {
						alert("Profile Created");
						nameInput.value = "";
						descriptionInput.value = "";
					},
					onFail: (err) => {
	
					}
				}
			)
		} else {
			console.log('User ID is null');
			
		}
		
	}
}
