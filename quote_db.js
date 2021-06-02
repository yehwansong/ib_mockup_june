var db = [
	[
	`“Green Papaya is [...] is a halfway house for ideas, a space to hang out and have real conversations again, a chance to cook and share meals. It is less about art than it is about being artists and being human again—and questioning what that means in our current context.",`,
	`Green Papaya Art Projects: Why Artist-Run Spaces`,
	`https://aaa.org.hk/en/ideas/ideas/green-papaya-art-projects-why-artist-run-spaces`,
	],[
	`LS: I think ‘action’ in photography is something to do with that sense of freshness: the photo shoot for My Husband in particular felt new and fresh to me. [...] My photographs render everything into reality: they are a way of bringing something back to life. You can talk about photographs in terms of ‘shooting’—to ‘shoot’ with a camera like you would shoot with a gun. However, for me, taking photos is not like shooting something: it’s like being shot. I am shot, and the entire timeline of my existence is resurrected in the photograph. So, I think photography is the revival of eternal time and eternal life; a photograph is not a representation of time that has been killed. In such conditions, that means that I myself am firmly embedded in the photograph.'`,
	`Ghosts in the Lens | TABlog | Tokyo Art Beat`,
	`https://www.tokyoartbeat.com/tablog/entries.en/2008/10/ghosts-in-the-lens.html`
	],[
	`“Art is a value in itself, creates space and food for thought. And this freedom - apart from economic usability and marketing - is urgently needed.”'`,
	`https://www.tokyoartbeat.com/tablog/entries.en/2008/10/ghosts-in-the-lens.html`,
	`https://www.p-art-icipate.net/projektnews/interview-mit-eva-egermann/`
	],[
	`“‘We are not oyster fishermen or citrus growers or lawyers,’ said Schwabe. ‘But we bring people together with different expertise to have discussions across political and environmental horizons.’”'`,
	`Eating at the End of the World`,
	`https://www.frieze.com/article/eating-end-world`
	],[
	`“Art needs to dominate the means of production that industry dominates.” (3:40-3:45)'`,
	`Meet The Artist: Atıf Akın`,
	`https://www.youtube.com/watch?v=L5v-8Q4xGH4`
	],[
	`“As such, the Library operates as a discursive space, in the knowledge that archives are unstable and incomplete, and that archival gaps are not deficiencies, but can create opportunities for dialogue.”'`,
	`https://www-tandfonline-com.libproxy1.nus.edu.sg/doi/pdf/10.1080/17514517.2019.1654245?needAccess=true`,
	`https://www-tandfonline-com.libproxy1.nus.edu.sg/doi/pdf/10.1080/17514517.2019.1654245?needAccess=true`

	],[
	`[also on the mangrove] It's not really about this machine and this thing, here, it's about all the conversations we've had. We've been dreaming about other stuff, and we talk about other things we could do together. (1:29-1:42)'`,
	`How Martha Atienza uses Art to Illuminate the Effects of Climate Change in Bantayan’s Communities `,
	`https://adobomagazine.com/the-magazine/martha-atienzas-equation-of-state-using-video-art-and-island-technology-to-illuminate-the-effects-of-climate-change-in-bantayan-islands-coastal-communities-and-the-importan/`
	],[
	`DN: What do you hope people will take away [..] from engaging or participating in the improvisational music that's happening? TA: Maybe the most important thing for me is to have the feeling that we shared something we cannot speak about. A moment that is undescribable.'`,
	`Artist and Composer Tarek Atoui - KRTS 93.5 FM Marfa Public RadioKRTS 93.5 FM Marfa Public`,
	`https://marfapublicradio.org/blog/west-texas-talk/artist-and-composer-tarek-atoui/`
	],[
	`“...a lot of the decisions on how elements are placed and in dialogue with each and with the space came from listening to the material one by one. So, listening to each stone, listening to the rails, and seeing how these elements are transmitting and emitting sound.” (3:14-3:32)`,
	`a lot of the decisions`,
	`https://fridericianum.org/tarek-atoui-interview/`
	],[
	`I should also stress that I identify more as a collector than artist: someone, who gathers, compiles, arranges, or reorganises relationships between things that often already exist in the world. [...] I certainly don’t see myself as an artist or ‘researcher’ but a collector: a collector of images, observations and small encounters. This type of ‘notation’ enfolds to form an ongoing archive alongside notes, recordings, interviews and artifacts. The process is accumulative. (p. 180)`,
	`Unpacking My Collection`,
	`https://ro.uow.edu.au/cgi/viewcontent.cgi?article=1795&context=theses1`
	],[
	`You know in the 90s I made this work called Lingga-Yoni that created problems with the radical groups of Muslims in Indonesia. They misunderstood it – or perhaps they didn’t want to understand. It was based on the ancient Hindu Buddhist philosophy which in a way I inherited from my ancestors. My struggle to connect ancient traditions with science and technology inevitably gets through my artwork. Lately I have gotten closer to Buddhism, but this isn’t about changing religion for me. I see the essence of all religions being basically the same; it is for the good of people of this earth. But of course there are different cultural contexts and different ways of doing it. I don’t make a big deal about it, I’m more interested in the idea of pluralism, respecting the differences.`,
	`Arahmaiani: The Superheroine of Indonesian Contemporary Art`,
	`https://www.cobosocial.com/dossiers/arahmaiani-superheroine-of-indonesian-contemporary-art/`
	],[
	`Art is the vehicle, the pretext for a conversation and for an exchange of ideas that incorporate the material as well as the personal for its execution."`,
	`Artist in focus: Laura Anderson Barbata on art and community`,
	`https://firstindigoandlifestyle.com/2016/07/26/artist-in-focus-laura-anderson-barbata/`
	],[
	`LAB: "...I presented Intervention: Indigo, a project that combines procession, performance, dance, music, textile arts, costuming, ritual, improvised interactions with the audience, and protest. It began at the Bushwick police precinct. The work is a call to action to serve and protect—and a protest in response to the violence and murder at the hands of the police of Black people living in this country and all over the world. The point of departure is the color indigo, a dye that is used around the globe and associated with protection, wisdom, and royalty. For example, in Burkina Faso, newborn babies are wrapped in indigo-dyed cloth to protect them. And I do not think it is a coincidence that indigo is the color of police uniforms here in the US, and almost all around the globe. It is a color imbedded with great meaning. [...] `,
	`Making Waves: A Conversation with Laura Anderson Barbata | post`,
	`https://post.moma.org/making-waves-a-conversation-with-laura-anderson-barbata/`
	]
]
$(document).ready(function(){
	for (var i = 0; i < db.length; i++) {
		$('.note').append('\
			<span class="note_quote_wrapper">\
				<span class="note_quote sans">'+db[i][0]+'</span>\
				<a href="'+db[i][2]+'" class="note_link serif" target="_blank">'+db[i][1]+'</a>\
			</span><br>\
			')
	}
	$('.note_b').click(function(){
			$('body').addClass('note_view')
		})
	$('.close').click(function(){
			$('body').removeClass('note_view')
	})
})