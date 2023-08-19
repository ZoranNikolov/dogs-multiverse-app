import { Component, Inject } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css'],
})
export class EditComponent {
	editedText: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) public postData: any,
		private firestore: FirebaseTSFirestore,
		private dialog: MatDialogRef<EditComponent>
	) {
		this.editedText = this.postData.comment;
	}

	ngOnInit(): void {
		// console.log(this.postData);
	}

	onEditSubmit() {
		this.firestore.update({
			path: ['Posts', this.postData.postId],
			data: {
				comment: this.editedText,
			},
			onComplete: () => {
				console.log('Post text updated successfully.');
				this.dialog.close();
				location.reload();
			},
		});
	}
}
