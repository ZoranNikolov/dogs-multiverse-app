import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
	selector: 'app-delete',
	templateUrl: './delete.component.html',
	styleUrls: ['./delete.component.css'],
})
export class DeleteComponent {
	editedText: string;
	forceUpdate!: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) public postData: any,
		private firestore: FirebaseTSFirestore,
		private dialog: MatDialogRef<DeleteComponent>
	) {
		this.editedText = this.postData.comment;
	}

	ngOnInit(): void {}

	onDeleteSubmit() {
		console.log('delete button clicked');

		this.firestore.delete({
			path: ['Posts', this.postData.postId],
			onComplete: () => {
				console.log('Post text deleted successfully.');
				this.dialog.close();
			},
		});
	}
}
