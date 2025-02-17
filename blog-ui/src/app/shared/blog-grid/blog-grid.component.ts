import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Post } from "../../types/keystone.interface";
import { BlogItem } from "../blog-item/blog-item.component";

@Component({
    selector: 'blog-grid',
    templateUrl: './blog-grid.component.html',
    styleUrl: 'blog-grid.component.scss',
    imports: [
        CommonModule,
        BlogItem,
    ],
})

export class BlogGrid {
    @Input() posts!: Post[];
}