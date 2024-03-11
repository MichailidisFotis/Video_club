


  

  const forms =  gsap.utils.toArray([".container"]);



  forms.forEach(form => {
      const anim =  gsap.fromTo(
        form,{
          autoAlpha:0,
          y:100,
          x:-100,
          rotate:-10  
        },
        {
          duration:0.6,
          autoAlpha:1,
          y:0,
          x:0,
          rotate:0
        }
      )
      ScrollTrigger.create({
        trigger:form,
        animation:anim
      })
      
  });
  










