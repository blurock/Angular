import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    alert("news");
    this.apiService.getNews().subscribe((data) => {
      console.log(data);
      alert(data['articles']);
      this.articles = data['articles'];
    });
  }

}
