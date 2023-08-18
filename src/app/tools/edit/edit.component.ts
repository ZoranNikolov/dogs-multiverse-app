import { Component, Inject } from '@angular/core';
import {
	FirebaseTSFirestore,
	OrderBy,
} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { AppComponent } from 'src/app/app.component';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css'],
})
export class EditComponent {
	editedText: string; // Property to hold the edited text

	constructor(
		@Inject(MAT_DIALOG_DATA) public postData: any,
		private firestore: FirebaseTSFirestore
	) {
		this.editedText = this.postData.comment; // Initialize with original text
	}

	ngOnInit(): void {
		// Now you can use this.postData to access the selected post's data
		console.log(this.postData);
	}

	onEditSubmit() {
		// Update the comment property in the post
		this.firestore.update({
			path: ['Posts', this.postData.postId], // Assuming you have postId in postData
			data: {
				comment: this.editedText,
			},
			onComplete: () => {
				console.log('Post text updated successfully.');
				// Close the dialog or perform any other necessary actions
			},
		});
	}
}

// export interface Comment {
// 	creatorId: string;
// 	creatorName: string;
// 	comment: string;
// 	timestamp: firebase.default.firestore.Timestamp;
//   }
