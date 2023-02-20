$(function()
{
    var document = $(document),
    fadeIn = $('.fade-scroll');

    document.on('scroll', function()
    {
        var currScrollPos = document.scrollTop();

        fadeIn.each(function()
        {
            var $this = $(this),
                elementOffsetTop = $this.offset().top;
            if(currScrollPos > elementOffsetTop)
            {
                $this.css('opacity',1 -(currScrollPos-elementOffsetTop)/400);
            }
        })
    })
})