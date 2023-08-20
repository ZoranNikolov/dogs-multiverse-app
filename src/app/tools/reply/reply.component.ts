import { Component, Inject } from '@angular/core';
import {
	FirebaseTSFirestore,
	OrderBy,
} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { AppComponent } from 'src/app/app.component';

@Component({
	selector: 'app-reply',
	templateUrl: './reply.component.html',
	styleUrls: ['./reply.component.css'],
})
export class ReplyComponent {
	firestore = new FirebaseTSFirestore();
	comments: Comment[] = [];

	constructor(@Inject(MAT_DIALOG_DATA) private postId: string) {}

	ngOnInit(): void {
		this.getComments();
	}

	isCommentCreator(comment: Comment) {
		try {
			return comment.creatorId == AppComponent.getUserDocument()?.userId;
		} catch (error) {
			return error;
		}
	}

	getComments() {
		this.firestore.listenToCollection({
			name: 'Post Comments',
			path: ['Posts', this.postId, 'PostComments'],
			where: [new OrderBy('timestamp', 'asc')],
			onUpdate: (result) => {
				result.docChanges().forEach((postCommentDoc) => {
					if (postCommentDoc.type == 'added') {
						this.comments.unshift(<Comment>postCommentDoc.doc.data());
					}
				});
			},
		});
	}

	onSendClick(commentInput: HTMLInputElement) {
		const userDocument = AppComponent.getUserDocument();
		
		if (userDocument && userDocument.userId) {
			const newCommentData = {
			  comment: commentInput.value,
			  creatorId: userDocument.userId,
			  creatorName: userDocument.publicName,
			  timestamp: FirebaseTSApp.getFirestoreTimestamp(),
			};

			this.firestore
			.create({
			  path: ['Posts', this.postId, 'PostComments'],
			  data: newCommentData,
			})
			.then(() => {
			  commentInput.value = '';
			});
		} else {
		  console.error('User data is unavailable. Cannot create comment.');
		}
	}
}

export interface Comment {
	creatorId: string;
	creatorName: string;
	comment: string;
	timestamp: firebase.default.firestore.Timestamp;
}
