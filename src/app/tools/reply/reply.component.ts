import { Component, Inject } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent {
	firestore = new FirebaseTSFirestore();
	constructor(@Inject(MAT_DIALOG_DATA) private postId: string){  }

	onSendClick(commentInput: HTMLInputElement){
		this.firestore.create(
			{
				path: ["Posts", this.postId, "PostComments"],
				data: {
					comment: commentInput.value,
					creatorId: "",
					creatorName: "",
					timestamp: FirebaseTSApp.getFirestoreTimestamp()
				}
			}
		)
	}
}
