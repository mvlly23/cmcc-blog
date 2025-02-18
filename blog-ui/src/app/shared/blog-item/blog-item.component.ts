import { Component, Input } from "@angular/core";
import { Post } from "../../types/keystone.interface";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'blog-item',
    templateUrl: 'blog-item.component.html',
    styleUrls: ['blog-item.component.scss'],
    imports: [CommonModule]
})

export class BlogItem {
    @Input() post!: Post;
    
    formatDate(): string  {
        const date = new Date(this.post.publishedAt);
        return date.toLocaleDateString('en-US');
    }
}