import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tem-delete',
  templateUrl: './tem-delete.component.html',
  styleUrls: ['./tem-delete.component.css']
})
export class TemDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  idTema: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (!environment.token)
    {
      this.router.navigate(["/entrar"])
    }

    this.idTema = this.route.snapshot.params["id"]
    this.findByIdTema(this.idTema)
  }

  findByIdTema(id: number)
  {
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  deletar()
  {
    this.temaService.deleteTema(this.idTema).subscribe(()=>{
      alert("Tema deletado")
      this.router.navigate(["/tema"])
    })
  }

}
