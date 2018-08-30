import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common'; 

import { visibility } from '../animation/app.animation';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';


@Component({
	selector: 'app-dishdetail',
	templateUrl: './dishdetail.component.html',
	styleUrls: ['./dishdetail.component.scss'],
	animations: [
		visibility()
	]
})
export class DishdetailComponent implements OnInit {

	dish: Dish;
	dishcopy = null;
	dishIds: number[];
	prev: number;
	next: number;
	commemtRating: number;
	newComment: Comment;
	commentForm: FormGroup;
	errMess: string;
	visibility = 'shown';


	formErrors = {
		'name': '',
		'message': ''
	};

	validationMessages = {
		'name': {
			'required':      'Name is required.',
			'minlength':     'Name must be at least 2 characters long.',
			'maxlength':     'Name cannot be more than 25 characters long.'
		},
		'message': {
			'required':      'Comment is required.',
		},
	};

	constructor(
		private dishService: DishService,
		private route: ActivatedRoute,
		private location: Location,
		private fb: FormBuilder,
		@Inject('BaseURL') private BaseURL
		) {}

	ngOnInit() {
		this.dishService.getDishIds()
			.subscribe(dishIds => this.dishIds = dishIds, errmess => ( this.errMess = <any>errmess.message ));

		this.route.params
			.pipe( switchMap((params: Params) => {
				this.visibility = 'hidden';
				return this.dishService.getDish(+params['id']);
			}) )
			.subscribe(dish => {
				this.dish = dish;
				this.dishcopy = dish;
				this.setPrevNext(dish.id);
				this.visibility = 'shown';
			},
			errmess => (this.errMess = <any>errmess.message));    

		this.createForm();	
	}

	setPrevNext(dishId: number) {
		let index = this.dishIds.lastIndexOf(dishId);
		this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
		this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
	}

	goBack(): void {
		this.location.back();
	}

	createForm(): void {
		this.commentForm = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
			message: ['', Validators.required ]
		});

		this.commentForm.valueChanges
				.subscribe(data => this.onValueChanges(data));

		this.onValueChanges();		
	}

	onValueChanges(data?): void{
		if(!data) {return ;}

		const form = this.commentForm;

		for(const field in this.formErrors) {
			this.formErrors[field] = '';
			const contol = form.get(field);
			if(contol && contol.dirty && !contol.valid) {
				const messages = this.validationMessages[field];
				for (const key in contol.errors) {
					this.formErrors[field] += messages[key] + ' ';
				}
			}
		}
	}

	onChangeRatingSlider(slider): void {
		this.commemtRating = slider.value;
	}

	onSubmit(): void{
		this.newComment = {
			rating: this.commemtRating,
			comment: this.commentForm.value.message,
			author: this.commentForm.value.name,
			date: new Date().toISOString()
		};

		this.dishcopy.comments.push(this.newComment);

		this.dishcopy.save()
			.subscribe(dish => (this.dish = dish));

		this.commentForm.reset();
	}
}
