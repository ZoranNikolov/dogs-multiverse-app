import { Component, Input } from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';
import { EditComponent } from '../edit/edit.component';
import { DeleteComponent } from '../delete/delete.component';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css'],
})
export class PostComponent {
	@Input() postData!: PostData;
	creatorName!: string;
	creatorDescription!: string;
	firestore = new FirebaseTSFirestore();

	constructor(private dialog: MatDialog) {}

	ngOnInit(): void {
		this.getCreatorInfo();
	}

	onReplyClick() {
		this.dialog.open(ReplyComponent, { data: this.postData.postId });
	}

	onEditClick(post: any) {
		this.dialog.open(EditComponent, { data: this.postData });
	}

	onDeleteClick(postData: any) {
		const dialogRef = this.dialog.open(DeleteComponent, {
		  data: { postData: postData },
		});
	  
		dialogRef.afterClosed().subscribe((result) => {
		  if (result === 'delete') {
			const db = firebase.firestore();
			const docRef = db.collection('Posts').doc(postData.postId);
	  
			docRef.delete().then(() => {
			  console.log('Post deleted successfully.');
			  // You might want to update your UI or perform other actions
			}).catch((error: string) => {
			  console.error('Error deleting post:', error);
			});
		  }
		});
	  }

	getCreatorInfo() {
		this.firestore.getDocument({
			path: ['Users', this.postData.creatorId],
			onComplete: (result) => {
				let userDocument = result.data();
				if (userDocument) {
					this.creatorName = userDocument['publicName'];
					this.creatorDescription = userDocument['description'];
				}
			},
		});
	}
}
