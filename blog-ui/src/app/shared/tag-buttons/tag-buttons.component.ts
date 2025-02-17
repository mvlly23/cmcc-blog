import { Component, EventEmitter, Output } from "@angular/core";
import { KeystoneService } from "../services/keystone.service";
import { Post, Tag } from "../../types/keystone.interface";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'tag-buttons',
    templateUrl: './tag-buttons.component.html',
    styleUrl: 'tag-buttons.component.scss',
    imports: [CommonModule],
})

export class TagButtons {
    // TODO add optional input to only display tags in posts for searches
    tags: Tag[] = [];
    @Output() tagSelected: EventEmitter<Post[]> = new EventEmitter();
    @Output() clearTags: EventEmitter<boolean> = new EventEmitter();
    constructor(private keystone: KeystoneService) {
        this.keystone.getTags().then((response: Tag[]) => {
            this.tags = response;
            this.tags = Array.from(this.tags).sort((a, b) => (b.postsCount - a.postsCount));
        });
    }

    selectedTag(tag: Tag) {
        this.tagSelected.emit(tag.posts);
    }

    clearTag() {
        this.clearTags.emit(true);
    }
}