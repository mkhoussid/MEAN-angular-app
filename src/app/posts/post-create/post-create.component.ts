import { Component } from "@angular/core";
import { post } from "selenium-webdriver/http";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {
  enteredValue = "";
  newPost = "No Content";

  onAddPost(postInput: HTMLTextAreaElement) {
    console.dir(postInput);
    this.newPost = this.enteredValue;
  }
}
