$(document).ready(function()
{
  $(window).scroll(function()
  {
    if($(document).scrollTop()>100)
    {
      $("nav").addClass('bg-dark','shadow')
    }
    else
    {
      $("nav").removeClass('bg-dark','shadow')
    }
  });
});

//