// Modo YES: Contenido esperanzador/romántico
// Estos son los tracks originales del reproductor

const BASE_URL = import.meta.env.BASE_URL;

export const YES_CONFIG = {
  ui: {
    title: "Un reproductor dedicado solo para ti.",
    titleEmoji: "🎵💝",
    subtitle: "Siempre que escucho estas canciones pienso en ti, espero te guste. 💕",
    badgeText: "7 canciones • letras • dedicatorias",
    footerText: "Hecho por Salvador Zeledón en dedicatoria para Gabriela Pimentel 💕",
    playlistHint: "No te saltes las dedicatorias, ahí está lo importante. Escribí lo que sentí al escuchar cada una pensando en ti.",
    playlistHintEmoji: "📖💕",
  },
  onboarding: [
    {
      icon: "Heart",
      title: "Hola! linda",
      content: "Soy yo de nuevo, espero estes bien, actualicé este proyecto con canciones que me hacen pensar en ti siempre y que escucho a diario para sentirte cerca. \n\n Espero te guste mucho.",
    },
    {
      icon: "Music2",
      title: "Feliz cumpleaños atrasadoooo!! ✨🎧",
      content: "Se que ya es algo tarde pero todo esto nacio del saber que cumpliste años, de hecho mi madre te compro una camisa pero por obvias razones no te la dí \n\nAun así decidí hacer este pequeño proyecto, con canciones que me hacen pensarte. También agradezco que no tiraras las flores a la basaura, enserio me hacia ilusion darte flores. 💕",
    },
    {
      icon: "ListOrdered",
      title: "Indicaciones:",
      bullets: [
        "Las canciones tienen un orden, por eso van numeradas.",
        "Todas las canciones tienen su respectiva dedicatoria (leelas)",
        "Todas las canciones cuentan con letra y traducción si así lo requieren, por si quieres prestarle mas atención a la letra.",
        "Sin nada más que decir, espero las disfrutes.",
      ],
      callout: "Para una mejor experiencia se recomienda el uso de auriculares.",
    },
  ],
};

export const YES_TRACKS = [
  {
    id: "01",
    title: "SOLARE",
    artist: "Esperón",
    album: "Esperón",
    src: `${BASE_URL}media/01.mp3`,
    cover: `${BASE_URL}covers/01.png`,
    dedication: `Hola, espero estes muy bien, que hayas disfrutado tu cumpleaños con tus seres queridos y tus personas cercanas, hace un tiempo te molestaste conmigo y me terminaste dias antes de mi cumpleaños y aun así me diste un regalo, un batman de crochet, aun lo guardo con mucho cariño y es por eso que quise dejar mi orgullo a un lado y poder darte algo bonito. Algo capaz de perdurar durante el tiempo aunque se que solo lo recordaras por un breve momento 
    
Sé que no me corresponde, pero noté que te celebraron tu cumpleaños con todos los de la oficina y me alegra mucho saber que eres una persona muy querida y me hizo feliz saber que la pasaste bien en una fecha que para ti es muy importante.

Se que no serás capaz de aceptar nada de mi, la verdad no creo que llegues ni a leer esto, pero desde que no te tengo en mi vida me he sentido muy solo y aveces mi unica compañia es la música y siempre escucho música triste, música que me hace pensar en ti, música que me hace sentirme peor de lo que me siento.

Asíque acá escucharas las canciones que más escucho cuando quiero sentir tu recuerdo cerca, cuando recuerdo que mi voluntad de amar murio con lo nuestro, aún así si en algún momento llegaste a pensar que yo no te extraño pues... nunca pudiste estar mas equivocada.

Por eso cada mañana escucho esta canción y grito: "Solecito no sabes cuanto me haces falta!"

Espero que te gusten estas dedicatorias, prometo que no lo hago con malas intenciones ni mal plan, ambos sabemos que siempre fuiste lo mas importante para mi: 

"No sé si tu aun piensas en mí
Solo se que siempre estás aquí
En mi cabeza todo el tiempo
Estas sombras me atormentan
Sueño que regresas
Solecito
No sabes cuánto me haces falta"

`,
    lyrics: `El día que te fuiste
Fue la ultima vez que salió el sol
No sé si fue casualidad o que pasó
Pero simplemente nunca más salió
Y aquí estoy
Esperando en medio de la oscuridad
Pensando si un día tu regresarás
Los días que han pasado son años quizás
No sé, no los puedo contar
Solecito
No sabes cuánto me haces falta
Desde que te fuiste tengo frío
Extraño tu calor por las mañanas
Solecito
Dame un rayito antes que te vayas
Pa' guardarlo con mucho cariño
Que te quedes siempre en mi alma
Te lo pido
Uh
Y aun observo el horizonte buscándote
No ha habido ni un solo amanecer
Solo quedan las tinieblas que dejaste tras tu paso
Bestias del ocaso, me están atrapando
No sé si tu aun piensas en mí
Solo se que siempre estás aquí
En mi cabeza todo el tiempo
Estas sombras me atormentan
Sueño que regresas
Solecito
No sabes cuánto me haces falta
Desde que te fuiste tengo frío
Extraño tu calor por las mañanas
Solecito
Dame un rayito antes que te vayas
Pa' guardarlo con mucho cariño
Que te quedes siempre en mi alma
Te lo pido
¿Cuántas veces necesito repetirte que te necesito?
Si te apagas, mi universo se apaga contigo
Y los planetas de mi sistema se mueven sin sentido
Todo colapsa, todo explota y se pierde en el vacío
Y recuerdo cuando todo era lindo
Cuando el sol aun brillaba y tu estabas conmigo
Enamorados navegando en el espacio alegremente
Dos estrellas destinadas a extrañarse para siempre
Y aun observo el horizonte buscándote
Y aun observo el horizonte buscándote
Solecito
No sabes cuánto me haces falta
Desde que te fuiste tengo frío
Extraño tu calor por las mañanas
Solecito
Dame un rayito antes que te vayas
Pa' guardarlo con mucho cariño
Que te quedes siempre en mi alma
Te lo pido`,
    theme: { mode: "dark", colors: ["#0B1220", "#2A0E0E", "#E7D7B6", "#C0392B"] },
  },
  {
    id: "02",
    title: "Tormento",
    artist: "Mon Laferte",
    album: "Mon Laferte",
    src: `${BASE_URL}media/02.mp3`,
    cover: `${BASE_URL}covers/02.jpg`,
    dedication: `Esta de mas decir que yo te quise de verdad, estuve dispuesto aguantar todo o almenos eso creí, estuve dispuesto amarte de la marena mas pulcra que creí merecias, quizá hice mal o quizá nunca lo mereciste o quizá mi amor no era lo que querias de mi.

Estuve dispuesto quererte de todas las formas concebibles por mi corazón, Estuve dispuesto apretar tus manos, aguantar tus malos tratos, abrazar tu indiferencia y ahogarme en esos esporadicos besos que me alimentaban la ilusión.

Estuve dispuesto a redactar mi amor solo para sacarte una sonrisa, dispuesto a dedicarte mis palabras mas elaboradas, dispuesto a ir a la iglesia contigo y a dedicarte todas mis fantasias.

Mi fantasia mas grande era que no me mintieras más, pero la realidad termino superando cualquier fantasía. Por eso te estoy escribiendo esto porque hace tiempo me dijiste que siempre habias querido un hombre que te amara tanto que estuviera obsesionado contigo y aquí lo tienes...

Estuve dispuesto a quedarme aún sabiendo que sería el otro siempre: 

"Nadie más te amará como te pude amar" 

Estuve dispuesto a dejar mi corazón en cada detalle y aquí sigo, con ojeras bajo mis parpados, sudor en mi frente y con hambre de creación, porque a pesar de todo sigues inspirando mis palabras, inspirando mis cartas y quitandome el sueño de todas las formas.
 `,
    lyrics: `Mi amor fue sincero
Te quise de verdad
A pesar de tu silencio
Te quise más
Un beso en el metro
Fue todo tan violento
A veces tan frenético
Me desespero
Yo presiento que tú volverás
Mi argumento, yo sé que jamás
Nadie más te amará
¿Cómo te pude amar?
Nadie más te puede aguantar
Como yo, como yo, uh
No me grites, por favor
De nuevo hueles a licor
De mi cuerpo yo quisiera
Borrar tus besos
Fue todo en febrero
Fue un romance sin dinero
Tu sexo tan poético
Como tus celos
Yo presiento que tú volverás
Mi argumento, yo sé que jamás
Nadie más te amará
Como te pude amar
Nadie más te puede aguantar
Como yo, como yo
Oh, oh mí amor nadie más te amará
Mi vida es un tormento
Mi vida es un lamento
Nadie más te amará
¿Cómo te pude amar?
Nadie más te puede aguantar
Como yo
Como yo`,
    theme: { mode: "light", colors: ["#F5E6D3", "#E8DCC8", "#6B8E23", "#C2A24A"] },
  },
  {
    id: "03",
    title: "Aunque no sea conmigo",
    artist: "Bunbury",
    album: "Bunbury",
    src: `${BASE_URL}media/03.mp3`,
    cover: `${BASE_URL}covers/03.jpg`,
    dedication: `Sin duda la canción que más me recuerda a ti, la canción que mas canté, que mas sentí y que mas me hace pensarte. 
Hace ya unas semanas me llamaste... 

La verdad aun no sé el porque me llamaste, la verdad yo jamás bloquié tus numeros osea siempre pudiste llamarme aunque me imagino que tu nunca desbloqueaste mis números y por eso recurriste a eso de comprar un nuevo chip digicel, es mas decirte que yo hace tiempo de desbloquié de IG y de Tiktok, tampoco estas bloqueada de whatsapp de ningun numero, solo te bloquié creo que por una semana y poco más. La verdad no sé porque te desbloquié pero creo que fué porque en el fondo seguía esperando que de alguna forma volvieras y pudieramos solucionar todo. 

El día que me llamaste de verdad me dejaste tan desconcertado y si tu objetivo era eso pues lo lograste. Ultimamente en las noches veo alguna serie o solo escucho música o salgo a caminar porque aveces me cuesta no pensarte y justo ese día, me acababa de bañar, me preparé un churro con limón y estaba por sentarme a ver una serie hasta quedarme dormido (como hice tantas noches anteriores), tenia cargando el teléfono y cuando lo fuí a traer vi 2 llamadas perdidas de un número desconocido y si soy muy honesto de alguna forma supe que eras tú.

Por un momento dude en corresponder la llamada, pero también tuve miedo de que no fueras tu y que armando se le haya quedado el carro y me estuviera llamando de otro número (ya nos ha pasado), asique correspondí la llamada, yo en el fondo queria que fueras tú pero jamás pensé que me ibas a contestar y cuando escuché tu voz, recordé las tantas noches que te escuché reír, que te escuché contarme tu día y las tantas noches que hablabamos aunque sea para pelear y aun así me hacian feliz esas llamadas y creeme que cuando te escuché una vez más, me congelé...

Por un momento no supe que decir, repetí lo mismo un par de veces y me preguntaste: 

-"como estas?" 

y con un nudo en la garganta me reí y te dije: 

-"imagino que tu estaras mejor que nunca?" 

y tu me dijiste:
 
-"si te refieres a lo que paso, pues sí estoy bien".

Eso me hizo pensar que solo me llamabas porque sabias que todo esto me estaba afectando mas a mi que a ti y eso me hizo sentir peor, asique con un nudo en la garganta solo te dije que estaba ocupado y me despedí. 

Ese día me costó dormir pensando en que nunca te pregunté porque me estabas llamando, algo en mi deseaba que nos arreglaramos que olvidaramos todo y volvieramos a cuanto a nuestra manera estabamos bien y a la vez recordaba todo lo que dices de mi y me volvía a decepcionar nuevamente.

Despues de lo que paso con nosotros, yo desactive las notificaciones de whatsapp ya de manera permanente y hasta el día de hoy todo sigue así, pero... a partir de ese día siempre y a diario cuando dan las 8pm activo el sonido de las llamadas y las notificaciones, porque a pesar de todo yo sigo esperando que algun día me llames otra vez y poder escuchar tu voz y poder preguntarte la razón por la que me llamaste aquella vez. Creo que esa situación me hizo darme cuenta de dos cosas, la primera es que siempre fuiste lo mas importante para mi y lo segundo que son ricas las miagajas. 

"Puedes tomarte el tiempo necesario, que por mi parte yo estare esperando 
el día que te decidas a volver y ser feliz como antes fuimos" 

"y no es por eso que haya dejado de quererte un solo día..." 

Odio lo que me identifico con esta canción, porque a pesar de todos mis errores almenos el saber que estas con el hombre que amas, pues de cierta forma me hace sentir un poco mejor, se que estas mas feliz sin mi.

Eso lo acepte hace tiempo

"Pero si ahora tienes, tan solo la mitad del gran amor que aun te tengo, 
Puedes jurar que al que te tiene lo bendigo, porque quiero que seas feliz
aunque no sea conmigo"

:´(
`,
    lyrics: `A placer
Puedes tomarte el tiempo necesario
Que por mi parte yo estaré esperando
El día en que te decidas a volver y ser feliz como antes fuimos
Sé muy bien
Que como yo estarás sufriendo a diario
La soledad de dos amantes que al dejarse
Están luchando cada quien por no encontrarse
Y no es por eso
Que haya dejado de quererte un solo día
Estoy contigo aunque estés lejos de mi vida
Por tu felicidad a costa de la mía
Pero si ahora tienes
Tan solo la mitad del gran amor que aún te tengo
Puedes jurar que al que te tiene lo bendigo
Quiero que seas feliz
Aunque no sea conmigo
Y no es por eso
Que haya dejado de quererte un solo día
Estoy contigo aunque estés lejos de mi vida
Por tu felicidad a costa de la mía
Pero si ahora tienes
Tan solo la mitad del gran amor que aún te tengo
Puedes jurar que al que te tiene lo bendigo
Quiero que seas feliz
Aunque no sea conmigo
`,
    theme: { mode: "dark", colors: ["#060B1A", "#1A0B16", "#0EA5E9", "#FB7185"] },
  },
  {
    id: "04",
    title: "N.M.F",
    artist: "Big Sempa",
    album: "Big Sempa",
    src: `${BASE_URL}media/04.mp3`,
    cover: `${BASE_URL}covers/04.jpg`,
    dedication: `La verdad estoy bastante cansado de todo el tema, yo sigo afirmando que lo unico que hice fue amarte de todas las formas y tu al final comenzaste a mentir por deporte, odio las mentiras y me decepcionaba tanto pensar que te gustaba verme la cara de pendejo siempre y creo que por eso estaba tan enojado, a mi nunca me molestó que tuvieras novio eso jamas me alejo de ti, yo solo queria que me dijeras la verdad. 

Prestale atención a la letra de esta canción, siento que fue hecha a la medida, como si el artista supiera como me siento. 

Lamento mucho todo lo que dije enojado sé que tengo que aprender a controlar mis problemas con la irá, 
lamento mucho todo lo que pasó, yo lo unico que queria era que dejaras de mentirme, habían momentos en los que sentia que todos sabian tu vida menos yo y eso me enojaba mucho porque yo siempre cuide mucho nuestra intimidad.
y me disculpo por mi reacción ahorita porque: 

"No hubo perdón ni un lo siento al final" 

"Dime, tus amigos aun se emocionan (se enojan) cuando les hablas de mi, 
me pregunto si sabrán como fue todo y lo que me hiciste sufrir
y aunque no me importa ser el bueno o el malo, dime: ¿que opinas de mi?" 

Fijate en la letra, la verdad esta canción habla por si sola...`,
    lyrics: `Dime si te duele recordar las flores afuera de tu jardín
Dime tus amigos aún se emocionan cuando les hablas de mí
Me pregunto si sabrán cómo fue todo y lo que me hiciste sufrir
Y aunque no me importa ser el bueno el malo dime qué opinas de mí
Noooooo no hubo perdón ni un lo siento al final
Nooooo no creo de forma sincera que vuelva a comprar
Flores flores, no más flores flores, no más
Fores flores flores no volver a comprar más flores
Flores flores flores (no volveré a comprar)
Ya no quiero pensar en nada, más bien dicho pensar en ti
Anoche consulté a la almohada, dijo debes dejarla ir
Dime si en verdad te importaba no importó cuando descubrí
Dime si estás acostumbrada o fui tan tonto que no lo vi
Detesto que aunque no lo quiera te extraño. Dios sabe que está mal
Mis amigos dicen no eras buena pa′ mi anda busca la ideal
Ojalá que no se estén equivocando y ya fuera allá algo más
Por qué aún con toda y la rabia en mi pecho no te dejo de pensar
Nooooooo no hubo un perdón ni aún lo siento al final
Noooooo no creo de forma sincera que vuelva a comprar
Dime si te duele recordar las flores afuera de tu jardín
Dime tus amigos, aún se emocionan cuando les hablas de mí
Dime si sabrán cómo es que ha sido todo y lo que me hiciste sufrir
Y aunque no me importa ser el bueno el malo dime qué opinas de mí`,
    theme: { mode: "light", colors: ["#FFF5F5", "#FFE0E0", "#EC4899", "#F59E0B"] },
  },
  {
    id: "05",
    title: "A que le tiramos",
    artist: "Bronco",
    album: "Bronco",
    src: `${BASE_URL}media/05.mp3`,
    cover: `${BASE_URL}covers/05.jpg`,
    dedication: `Sé que han pasado demasiadas cosas y estas creo que nos marcaron de diferentes maneras, todo lo feo que paso entre nosotros no creo conveniente olvidarlo pero... tampoco encuentro razones para olvidar todo lo bonito, tampoco encuentro la forma de simplemente olvidarme de ti o fingir que no viviste en mi mente estos ultimos meses, hay momentos en los que extraño reirme contigo, extraño tomar tu mano y compartir cualquier canción que nos guste, en realidad te extraño de todas las formas... 

y me niego a pensar que no me has extrañado, me niego a creer que mi amor no tuvo efecto en ti, me niego a creer que todos los besos furtivos y todas esas veces donde me enamore de tu mirada ahora no tengan valor, me niego a creerlo. 

Me niego a creer que no extrañas mis detalles, detalles como este que me quitan el sueño y vacian mi corazón y todo para recordar lo especial que siempre fuiste. 

La verdad esque te extraño y lo unico que quisiera es dejar todo lo malo a un lado y que intentemos recuperar todo lo bueno, lo bonito, lo que nos mantenia unidos a pesar de todo, recuperar todo aprendiendo de los errores para no repetirlos y buscando ese punto entre la paciencia y el respeto que tanta falta nos hizo antes. La verdad esque he soñado contigo ya varias veces, soñé con tu mirada, con tus besos y también con tus tragedias y desprecio hacia mi.

La verdad es que lo unico que quisiera en este momento esque nos demos la oportunidad para sanar y corregir nuestros errores juntos. 

Sabes que me encanta hacerte estos detalles, siempre me llenan el corazón y te sacan una sonrisa, quisiera poder tener el derecho de seguir cultivando sonrisas y que te des otra oportunidad para coleccionar mis detalles.

Aún conservo nuestras fotos y aveces las veo y veo esos ojos tan lindos y me vuelvo a enganchar de ellos. Lamento decirte todo esto, la verdad no quiero que pienses que te estoy platonizando ni nada equivalente, solo quiero que sepas que yo me fije en ti desde la primera vez que te vi y al día de hoy aun con todo encima te veo y no puedo evitar querer tenerte conmigo y lamento eso. Se que lo mas probable es que lo que menos quieras sea tenerme cerca, pero soy terco y soy de los que prefieren morir en el intento que pasar una vida pensando que hubieses pasado si lo intentaba. 

Bueno, eso es todo, espero hayas disfrutado todo y que las canciones sean de tu gusto... Por cierto cuando termines de escuchar por completo las canciones, aparecera un mensaje oculto.

Si llegaste hasta acá, gracias por leer todo, te mando un abrazo por tu cumpleaños...

`,
    lyrics: `Vamos a ponernos de acuerdo me interesa contigo
La reconciliación
Siento que también tu me extrañas
Y que no has conseguido paz en tu corazón
A que le tiramos si te quiero y me quieres
Si no puedo olvidarte
Si mi ausencia te hiere
A que le tiramos corazón a donde vamos
Si no hemos podido
Vivir separados
A que le tiramos corazón si tu me amas
Si te llevo en la sangre
Si entre sueños me llamas
A que le tiramos corazón a donde vamos
Si no hemos podido
Vivir separados
Todo lo hemos intentado
Ni con otros amores, no pudimos triunfar
Vamos empecemos de nuevo
Por favor no recuerdes lo que nos hizo mal
A que le tiramos si te quiero y me quieres
Si no puedo olvidarte
Si mi ausencia te hiere
A que le tiramos corazón a donde vamos
Si no hemos podido
Vivir separados
A que le tiramos corazón si tu me amas
Si te llevo en la sangre
Y entre sueños me llamas
A que le tiramos corazón a donde vamos
Si no hemos podido
Vivir separados`,
    theme: { mode: "dark", colors: ["#05070E", "#111827", "#B91C1C", "#60A5FA"] },
  }
];
