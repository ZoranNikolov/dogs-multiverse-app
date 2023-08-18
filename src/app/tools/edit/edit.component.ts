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
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
	
	constructor(@Inject(MAT_DIALOG_DATA) public postData: any) {

	}

	ngOnInit(): void {
		// Now you can use this.postData to access the selected post's data
		console.log(this.postData)
	  }
}

// export interface Comment {
// 	creatorId: string;
// 	creatorName: string;
// 	comment: string;
// 	timestamp: firebase.default.firestore.Timestamp;
//   }