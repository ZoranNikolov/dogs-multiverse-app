import { Component } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
	selectedImageFile!: File;
	auth = new FirebaseTSAuth();
	firestore = new FirebaseTSFirestore();
	storage = new FirebaseTSStorage();
	constructor(private dialog: MatDialogRef<CreatePostComponent>) {}

	onPostClick(commentInput: HTMLTextAreaElement) {
		let comment = commentInput.value;
		if (comment.length <= 0) return;
		if (this.selectedImageFile) {
			this.uploadImagePost(comment);
		} else {
			this.uploadPost(comment);
		}
	}

	uploadImagePost(comment: string) {
		let postId = this.firestore.genDocId();
		this.storage.upload({
			uploadName: 'upload Image Post',
			path: ['Posts', postId, 'image'],
			data: {
				data: this.selectedImageFile,
			},
			onComplete: (downloadUrl) => {
				this.firestore.create({
					path: ['Posts', postId],
					data: {
						comment: comment,
						creatorId: this.auth.getAuth().currentUser?.uid,
						imageUrl: downloadUrl,
						timestamp: FirebaseTSApp.getFirestoreTimestamp(),
					},
					onComplete: (docId) => {
						this.dialog.close();
					},
				});
			},
		});
	}

	uploadPost(comment: string) {
		this.firestore.create({
			path: ['Posts'],
			data: {
				comment: comment,
				creatorId: this.auth.getAuth().currentUser?.uid,
				timestamp: FirebaseTSApp.getFirestoreTimestamp(),
			},
			onComplete: (docId) => {
				this.dialog.close();
			},
		});
	}

	onPhotoSelected(photoSelector: HTMLInputElement) {
		const files = photoSelector.files;
		if (!files || !files.length) {
			return;
		}

		this.selectedImageFile = files[0];
		let fileReader = new FileReader();
		fileReader.readAsDataURL(this.selectedImageFile);

		fileReader.addEventListener('loadend', (ev) => {
			let readableString = fileReader.result as string | undefined;
			let postPreviewImage = <HTMLImageElement>(
				document.getElementById('post-preview-image')
			);

			if (postPreviewImage && readableString) {
				postPreviewImage.src = readableString;
			}
		});
	}
}
