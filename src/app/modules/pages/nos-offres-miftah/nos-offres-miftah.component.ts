import { Component, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fuseAnimations } from '@fuse/animations';


@Component({
    selector     : 'nos-offres-miftah',
    templateUrl  : './nos-offres-miftah.component.html',
    styleUrls       : ['./nos-offres-miftah.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NosOffresMiftahComponent
{
    
    /**
     * Constructor
     */
    constructor()
    {
    }

    showDiv = true;
    showDiv2 = false;
    showDiv3 = false;
    showDiv4 = false;
    showDiv5 = false;
    showDiv6 = false;
    showDiv7 = false;
    showDiv8 = false;
    showDiv9 = false;
    showDiv10 = false;
    showDiv11 = false;
    showDiv12 = false;
    showDiv13 = false;
    showDiv14 = false;

    /* l image du visuel */
    imageVisDet = 'assets/images/pages/nos-offres-miftah/Vis_2.png';
    imageSrc = 'assets/images/pages/nous-connaitre/Icon 1_2.svg';

    imageVisDet2 = 'assets/images/pages/nos-offres-miftah/Construction_243297886.jpg';
    imageVisDet3 = 'assets/images/pages/nos-offres-miftah/Terrain_2193549151.jpg';

    imageVisDet4 = 'assets/images/pages/nos-offres-miftah/Terrain et construction_1247187910(2).jpg';

    imageVisDet5 = 'assets/images/pages/nos-offres-miftah/Professionel 2_284936198.jpg';




    imageVisDet7 = 'assets/images/pages/nos-offres-miftah/MRE-BILA HOUDOUD_2042991488.jpg';

    imageVisDet8 = 'assets/images/pages/nos-offres-miftah/Etrangers non residents_1660072789.jpg';




    imageVisDet10 = 'assets/images/pages/nos-offres-miftah/Santé_1946243179.jpg';

    imageVisDet14= 'assets/images/pages/nos-offres-miftah/Attaalim_2007116861.jpg';


















    /* les icone  */
    imageSrc1 = 'assets/images/pages/nos-offres-miftah/Icon 1_2.svg';
    imageSrc2 = 'assets/images/pages/nos-offres-miftah/Icon 2.svg';
    imageSrc3 = 'assets/images/pages/nos-offres-miftah/Icon 3_2.svg';
    imageSrc4 = 'assets/images/pages/nos-offres-miftah/Icon 4.svg';
    







    imageS = 'assets/images/pages/nous-connaitre/Icon 3.svg';



    onDivClick(event) {
        console.log("Div clicked!");
        if (event.target.classList.contains('div-1')) {

          this.showDiv2 = false;
          this.showDiv = true;
          this.showDiv3 = false;
          this.showDiv4 = false;
          this.showDiv5 = false;
          this.showDiv6 = false;
          this.showDiv7 = false;
          this.showDiv8 = false;
          this.showDiv9 = false;
          this.showDiv10 = false;
          this.showDiv11 = false;
          this.showDiv12 = false;
          this.showDiv13 = false;
          this.showDiv14 = false;

          this.imageSrc1 = 'assets/images/pages/nos-offres-miftah/Icon 1_2.svg';
          this.imageSrc2 = 'assets/images/pages/nos-offres-miftah/Icon 2.svg';
          this.imageSrc3 = 'assets/images/pages/nos-offres-miftah/Icon 3_2.svg';
          this.imageSrc4 = 'assets/images/pages/nos-offres-miftah/Icon 4.svg';



           

          } else {
            this.showDiv = false;
        
            
          }

        

 
    }

    onDivClick2(event) {
        console.log("Div clicked 2!");
        if (event.target.classList.contains('div-2')) {
          this.showDiv2 = true;
          this.showDiv = false;
          this.showDiv3 = false;
          this.showDiv4 = false;
          this.showDiv5 = false;
          this.showDiv6 = false;
          this.showDiv7 = false;
          this.showDiv8 = false;
          this.showDiv9 = false;
          this.showDiv10 = false;
          this.showDiv11 = false;
          this.showDiv12 = false;
          this.showDiv13 = false;
          this.showDiv14 = false;
        
          this.imageSrc2 = 'assets/images/pages/nos-offres-miftah/Icon 2_2.svg';
          this.imageSrc1 = 'assets/images/pages/nos-offres-miftah/Icon 1.svg';
          this.imageSrc3 = 'assets/images/pages/nos-offres-miftah/Icon 3_2.svg';
          this.imageSrc4 = 'assets/images/pages/nos-offres-miftah/Icon 4.svg';




          } else {
            this.showDiv2 = false;
          
          }

      

    }

    onDivClick3(event) {
        console.log("Div clicked 3!");
        if (event.target.classList.contains('div-3')) {
          this.showDiv2 = false;
          this.showDiv = false;
          this.showDiv3 = true;
          this.showDiv4 = false;
          this.showDiv5 = false;
          this.showDiv6 = false;
          this.showDiv7 = false;
          this.showDiv8 = false;
          this.showDiv9 = false;
          this.showDiv10 = false;
          this.showDiv11 = false;
          this.showDiv12 = false;
          this.showDiv13 = false;
          this.showDiv14 = false;

          this.imageSrc2 = 'assets/images/pages/nos-offres-miftah/Icon 2.svg';
          this.imageSrc1 = 'assets/images/pages/nos-offres-miftah/Icon 1.svg';
          this.imageSrc3 = 'assets/images/pages/nos-offres-miftah/Icon 3_2.svg';
          this.imageSrc4 = 'assets/images/pages/nos-offres-miftah/Icon 4.svg';


          } else {
            this.showDiv3 = false;
          }
    }

    onDivClick4(event) {
      console.log("Div clicked 4!");
      if (event.target.classList.contains('div-4')) {
        this.showDiv2 = false;
        this.showDiv = false;
        this.showDiv3 = false;
        this.showDiv4 = true;
        this.showDiv5 = false;
        this.showDiv6 = false;
        this.showDiv7 = false;
        this.showDiv8 = false;
        this.showDiv9 = false;
        this.showDiv10 = false;
        this.showDiv11 = false;
        this.showDiv12 = false;
        this.showDiv13 = false;
        this.showDiv14 = false;

        this.imageSrc2 = 'assets/images/pages/nos-offres-miftah/Icon 2.svg';
        this.imageSrc1 = 'assets/images/pages/nos-offres-miftah/Icon 1.svg';
        this.imageSrc3 = 'assets/images/pages/nos-offres-miftah/Icon 3_2.svg';
        this.imageSrc4 = 'assets/images/pages/nos-offres-miftah/Icon 4_2.svg';
        
          
        } else {
          this.showDiv4 = false;
        
        }

    

  }

  onDivClick5(event) {
    console.log("Div clicked 5!");
    if (event.target.classList.contains('div-5')) {
      this.showDiv2 = false;
      this.showDiv = false;
      this.showDiv3 = false;
      this.showDiv4 = false;
      this.showDiv5 = true;
      this.showDiv6 = false;
      this.showDiv7 = false;
      this.showDiv8 = false;
      this.showDiv9 = false;
      this.showDiv10 = false;
      this.showDiv11 = false;
      this.showDiv12 = false;
      this.showDiv13 = false;
      this.showDiv14 = false;
    
      
        
      } else {
        this.showDiv5 = false;
      
      }

  

}

onDivClick6(event) {
  console.log("Div clicked 6!");
  if (event.target.classList.contains('div-6')) {
    this.showDiv2 = false;
    this.showDiv = false;
    this.showDiv3 = false;
    this.showDiv6 = true;
    this.showDiv5 = false;
    this.showDiv7 = false;
    this.showDiv8 = false;
    this.showDiv9 = false;
    this.showDiv10 = false;
    this.showDiv11 = false;
    this.showDiv12 = false;
    this.showDiv13 = false;
    this.showDiv14 = false;
  
    
      
    } else {
      this.showDiv6 = false;
    
    }

}

onDivClick7(event) {
  console.log("Div clicked 6!");
  if (event.target.classList.contains('div-7')) {
    this.showDiv2 = false;
    this.showDiv = false;
    this.showDiv3 = false;
    this.showDiv6 = false;
    this.showDiv5 = false;
    this.showDiv7 = true;
    this.showDiv8 = false;
    this.showDiv9 = false;
    this.showDiv10 = false;
    this.showDiv11 = false;
    this.showDiv12 = false;
    this.showDiv13 = false;
    this.showDiv14 = false;
  
    
      
    } else {
      this.showDiv6 = false;
    
    }



}

onDivClick8(event) {
  console.log("Div clicked 6!");
  if (event.target.classList.contains('div-8')) {
    this.showDiv2 = false;
    this.showDiv = false;
    this.showDiv3 = false;
    this.showDiv6 = false;
    this.showDiv5 = false;
    this.showDiv7 = false;
    this.showDiv8 = true;
    this.showDiv9 = false;
    this.showDiv10 = false;
    this.showDiv11 = false;
    this.showDiv12 = false;
    this.showDiv13 = false;
    this.showDiv14 = false;
  
    
      
    } else {
      this.showDiv8 = false;
    
    }



}

onDivClick9(event) {
  console.log("Div clicked 6!");
  if (event.target.classList.contains('div-9')) {
    this.showDiv2 = false;
    this.showDiv = false;
    this.showDiv3 = false;
    this.showDiv6 = false;
    this.showDiv5 = false;
    this.showDiv7 = false;
    this.showDiv8 = false;
    this.showDiv9 = true;
    this.showDiv10 = false;
    this.showDiv11 = false;
    this.showDiv12 = false;
    this.showDiv13 = false;
    this.showDiv14 = false;
  
    
      
    } else {
      this.showDiv9 = false;
    
    }



}

onDivClick10(event) {
  console.log("Div clicked 6!");
  if (event.target.classList.contains('div-10')) {
    this.showDiv2 = false;
    this.showDiv = false;
    this.showDiv3 = false;
    this.showDiv6 = false;
    this.showDiv5 = false;
    this.showDiv7 = false;
    this.showDiv8 = false;
    this.showDiv9 = false;
    this.showDiv10 = true;
    this.showDiv11 = false;
    this.showDiv12 = false;
    this.showDiv13 = false;
    this.showDiv14 = false;
  
    
      
    } else {
      this.showDiv10 = false;
    
    }



}

onDivClick11(event) {
  console.log("Div clicked 6!");
  if (event.target.classList.contains('div-11')) {
    this.showDiv2 = false;
    this.showDiv = false;
    this.showDiv3 = false;
    this.showDiv6 = false;
    this.showDiv5 = false;
    this.showDiv7 = false;
    this.showDiv8 = false;
    this.showDiv9 = false;
    this.showDiv10 = false;
    this.showDiv11 = true;
    this.showDiv12 = false;
    this.showDiv13 = false;
    this.showDiv14 = false;
  
    
      
    } else {
      this.showDiv11 = false;
    
    }



}


onDivClick12(event) {
  console.log("Div clicked 6!");
  if (event.target.classList.contains('div-12')) {
    this.showDiv2 = false;
    this.showDiv = false;
    this.showDiv3 = false;
    this.showDiv6 = false;
    this.showDiv5 = false;
    this.showDiv7 = false;
    this.showDiv8 = false;
    this.showDiv9 = false;
    this.showDiv10 = false;
    this.showDiv11 = false;
    this.showDiv12 = true;
    this.showDiv13 = false;
    this.showDiv14 = false;
  
    
      
    } else {
      this.showDiv12 = false;
    
    }



}


onDivClick13(event) {
  console.log("Div clicked 6!");
  if (event.target.classList.contains('div-13')) {
    this.showDiv2 = false;
    this.showDiv = false;
    this.showDiv3 = false;
    this.showDiv6 = false;
    this.showDiv5 = false;
    this.showDiv7 = false;
    this.showDiv8 = false;
    this.showDiv9 = false;
    this.showDiv10 = false;
    this.showDiv11 = false;
    this.showDiv12 = false;
    this.showDiv13 = true;
    this.showDiv14 = false;
  
    
      
    } else {
      this.showDiv13 = false;
    
    }



}


onDivClick14(event) {
  console.log("Div clicked 14!");
  if (event.target.classList.contains('div-14')) {
    this.showDiv2 = false;
    this.showDiv = false;
    this.showDiv3 = false;
    this.showDiv6 = false;
    this.showDiv5 = false;
    this.showDiv7 = false;
    this.showDiv8 = false;
    this.showDiv9 = false;
    this.showDiv10 = false;
    this.showDiv11 = false;
    this.showDiv12 = false;
    this.showDiv13 = false;
    this.showDiv14 = true;
  
    
      
    } else {
      this.showDiv14 = false;
    
    }



}




    
}
