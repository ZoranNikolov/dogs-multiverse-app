import { Component, Input } from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';
import { EditComponent } from '../edit/edit.component';
import { DeleteComponent } from '../delete/delete.component';
import { AuthenticatorComponent } from '../authenticator/authenticator.component'; 
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

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
	auth = new FirebaseTSAuth();

	constructor(private dialog: MatDialog) {}

	ngOnInit(): void {
		this.getCreatorInfo();
		// console.log('this is current user id ', this.auth.getAuth().currentUser?.uid);
		// console.log('this is post creator id ', this.postData.creatorId)
		// this.isPostAuthor()
	}

	isPostAuthor(){
		if(this.auth.getAuth().currentUser?.uid == this.postData.creatorId){
			return true;
		} else {
			return false;
		}
	}

	onReplyClick() {
		this.dialog.open(ReplyComponent, { data: this.postData.postId });
	}

	onEditClick(post: any) {
		this.dialog.open(EditComponent, { data: this.postData });
	}

	onDeleteClick(postData: any) {
		this.dialog.open(DeleteComponent, { data: this.postData })
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
