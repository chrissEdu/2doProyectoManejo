import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { SharedModule } from 'src/app/shared/shared.module';


@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  
  
})

export class CharacterDetailPage implements OnInit {
 

  characterId: string = '';
  character = null as any;
  episodes: any[]=[];
  constructor(
    private actRoute: ActivatedRoute,
    private rickAndMortySvc: RickAndMortyService
  ) {
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string
    console.log(this.characterId);
  }

  ngOnInit() {
  }
   ionViewWillEnter() {
    this.getCharacter()
   }
  //======= Obtener personajes ==========
  getCharacter(){
   

    this.rickAndMortySvc.getCharacterById(this.characterId).subscribe({
      next: (res: any)=>{
        console.log(res);
        this.character = res;
        this.getEpisodes()
      },
      error:(error: any) => {
      
      }
    })
  }
  //======= Obtener episodios ==========
  getEpisodes(){
   for(let url of this.character.episode){
    this.rickAndMortySvc.getByUrl(url).subscribe({
      next: (res: any)=>{
       console.log(res);
       this.episodes.push(res)
      },
      error:(error: any) => {
      
      }
    })
   }

   
  }
}
