import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaTemas: Tema[] 
  idtema: number
  tema: Tema = new Tema

  user: User = new User()
  idUser = environment.id

  listaPost: Postagem[]

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit(){

    window.scroll(0,0)

    if(!environment.token)
    {
      alert('Sua seção expirou.')
      this.router.navigate(['/entrar'])
    }
    this.getAllTemas()
    this.getAllPost()
    this.findByIdUser()
  }

  getAllTemas()
  {
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  findByIdTema()
  {
    this.temaService.getByIdTema(this.idtema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  getAllPost()
  {
    this.postagemService.getAllPost().subscribe((resp: Postagem[])=>{
      this.listaPost = resp 
      console.log(this.listaPost)
    })
  }

  findByIdUser()
    {
      this.authService.getByIdUser(this.idUser).subscribe((resp: User)=>{
        this.user = resp
      })
    }

  publicar()
  {
    this.tema.id = this.idtema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=> {
      this.postagem = resp
      alert("Postagem realizada com sucesso.")
      this.postagem = new Postagem()
      this.getAllPost()
    })
  }

}
