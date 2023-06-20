import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/core';
import {IonicModule} from '@angular/core';
import {FormsModule} from '@angular/core';
import {ActivatedRoute} from '@angular/core';
import {SharedModule} from '@angular/core';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';


@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,SharedModule]
})
export class CharacterDetailPage implements OnInit {

  characterId: string ='';
  constructor(
    private actRoute: ActivatedRoute,
    private rickAndMortySvc: RickAndMortyService 
  ) { 
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string
    console.log(this.characterId);
  }

  ngOnInit() {
  }

  //crear funcion para obtener el personaje
  ionViewWillEnter(){
    this.getCharacters()
  }
  getCharacters(){

    this.rickAndMortySvc.getCharacterById(this.characterId).subscribe({
      next: (res: any)=>{
        console.log(res);
      },
      error:(error: any) => {

      }
    })
  }
}
