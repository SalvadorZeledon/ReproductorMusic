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
      title: "Hola! corazón de melón. 💛🍈",
      content: "Perdón, se que me tarde, pero las cosas buenas llevan tiempo y quería que todo estuviera perfecto para ti. \n\nEste es un pequeño reproductor de música que hice especialmente para ti, con canciones que me hacen pensar en ti cada vez que las escucho. Espero te guste mucho.",
    },
    {
      icon: "Music2",
      title: "Algo diferente para una chica diferente. ✨🚌🎧",
      content: "Me encanto pasar el día contigo y quería hacer algo especial para ti, algo que pudieras llevar contigo a donde fueras y escuchar cuando quisieras. \n\nAsí que decidí hacer este pequeño proyecto, con canciones que me hacen pensarte. También agradezco que dijeras que sí. 💕",
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
    title: "Hasta Que Amanezca",
    artist: "Joan Sebastian",
    album: "Joan Sebastian",
    src: `${BASE_URL}media/01.mp3`,
    cover: `${BASE_URL}covers/01.jfif`,
    dedication: `Quiero darte las gracias por darme la oportunidad de quererte, porque asumo que si estás leyendo esto pues es porque dijiste que "Sí" voluntariamente, porque si no, ya la cagaste porque no hay devoluciones jajajajaja xD

Gracias por darme otra oportunidad de demostrarte que soy un buen hombre y que quiero ser un buen hombre solo para ti. Te quiero mucho y significas mucho para mí.

Espero hacer todo bien y algún día estemos en la playa con una pilsener en la mano cada uno y estemos cantando esta canción:

"Hoy nos amaremos, hoy nos amaremos hasta que amanezca"`,
    lyrics: `Hoy nos amaremos hoy nos quedaremos hasta que amanezca
Hoy lo viviremos y que nos importa que absurdo parezca
Nos amamos esa es la verdad, nos queremos es la realidad
Lo demás, que importa
Hoy nos amaremos hoy navegaremos con el alma abierta
Olvida la gente ellos ya no existen al cerrar la puerta
Este amor no es fácil de encontrar no lo vamos a sacrificar
No mi amor
Ámame y déjame amarte a mi manera
Tómame sediento de ti mi cuerpo espera
Ámame y déjame amarte a mi manera
Y que diga la gente, lo que quiera
Este amor no es fácil de encontrar no lo vamos a sacrificar
No mi amor
Hoy nos amaremos hoy nos quedaremos hasta que amanezca
Tu cuerpo es tan frágil el mio es de fuego y la mañana es fresca
Es propicio el tiempo para amar, no lo vamos a desperdiciar
No mi amor
Ámame y déjame amarte a mi manera
Tómame sediento de ti mi cuerpo espera
Ámame y déjame amarte a mi manera
Y que diga la gente, lo que quiera
Ámame y déjame amarte a mi manera
Tómame sediento de ti mi cuerpo espera
Ámame y déjame amarte a mi manera
Y que diga la gente, lo que quiera`,
    theme: { mode: "dark", colors: ["#0B1220", "#2A0E0E", "#E7D7B6", "#C0392B"] },
  },
  {
    id: "02",
    title: "Ángel",
    artist: "Elefante",
    album: "Elefante",
    src: `${BASE_URL}media/02.mp3`,
    cover: `${BASE_URL}covers/02.jfif`,
    dedication: `Esta es una de mis canciones favoritas, es muy buena y la verdad siento a nivel general o mejor dicho a nivel colectivo todos le dan gran significado, quiero decir que esta canción no se dedica a la ligera y yo te la quiero dedicar a ti porque soy un tipo listo y siempre quiero tener todo planeado y por lo mismo pienso mucho las cosas y si no estoy seguro de algo pues no me arriesgo. Pero, contigo me arriesgué y gracias a eso ahora estoy seguro que quiero tenerte cerca siempre.

Por eso te dedico esta canción, porque mi proyecto de este año es que seas el tatuaje de mi alma!, para siempre te encontré.`,
    lyrics: `Te encontré de madrugada
Cuando menos lo esperaba
Cuando no buscaba nada
Te encontré

Pregunté con la mirada
Tu sonrisa me invitaba
¿Para qué tantas palabras?
¿Para qué?

Y yo que me pasaba noches, días
Entre amores de mentiras
Entre besos de papel

Y yo que no creía en cuentos de hadas
Ni en princesas encantadas
No me pude defender

Y eres tú, solo tú
La que me lleva a la Luna
La que calma mi locura
La que me quema la piel

Y eres tú, siempre tú
Ángel de la madrugada
El tatuaje de mi alma
Para siempre, te encontré

Me colgué de tu mirada
Me quedé con tu sonrisa
Si te vas
No existe nada
Si te vas

Y ahora sé, solo sé
Te cruzaste en mi camino
Encontré el paraíso
Y me quedé

Y yo que no creía en cuentos de hadas
Ni en princesas encantadas
No me pude defender

Y eres tú, solo tú
La que me lleva a la Luna
La que calma mi locura
La que me quema la piel

Y eres tú, siempre tú
Ángel de la madrugada
El tatuaje de mi alma
Para siempre, te encontré

Y eres tú, solo tú
La que me lleva a la Luna
La que calma mi locura
La que me quema la piel

Y eres tú, siempre tú
Ángel de la madrugada
El tatuaje de mi alma
Para siempre, te encontré

Y eres tú
Siempre tú
Para siempre

Y eres tú, oh
Solo tú
Para siempre
Para siempre`,
    theme: { mode: "light", colors: ["#F5E6D3", "#E8DCC8", "#6B8E23", "#C2A24A"] },
  },
  {
    id: "03",
    title: "Perfecta",
    artist: "Miranda",
    album: "Miranda",
    src: `${BASE_URL}media/03.mp3`,
    cover: `${BASE_URL}covers/03.jfif`,
    dedication: `¿Alguna vez te conté por qué me comenzaste a gustar? ¿O en qué momento me fijé en ti? Jajaja creo que no lo has de recordar pero fue una vez que te escuché cantar, veníamos bajándonos del micro e íbamos el inge colochito, tú y yo. Yo venía delante tuyo y vos comenzaste a cantar y hablar sola y yo te venía escuchando y lo primero que pensé fue "esta chica es especial, es diferente" y ahí me llamaste la atención y si te preguntas el ¿por qué eso me llamó la atención? es porque sentí que no te da miedo ser tú, que tienes el coraje y la valentía por no cambiar por nadie ni en ningún contexto y eso me encanta.`,
    lyrics: `Tan pronto yo te vi
No pude descubrir
El amor a primera vista no funciona en mí
Después de amarte comprendí
Que no estaría tan mal
Probar tu otra mitad
No me importó si arruinaríamos nuestra amistad
No me importó y ya qué más da

Éramos tan buenos amigos hasta hoy
Que yo probé tu desempeño en el amor
Me aproveché de que habíamos tomado tanto
Te fuiste dejando y te agarré
A pesar de saber que estaba todo mal
Lo continuamos hasta juntos terminar
Cuando caímos en lo que estaba pasando
Te seguí besando y fue

Solo tú, no necesito más
Te adoraría lo que dure la eternidad
Debes ser perfecta para, perfecto para
Perfecta para mí, mi amor
¿Cómo fue que de papel cambié?
Eras mi amiga y ahora eres mi mujer
Debes ser perfectamente, exactamente
Lo que yo siempre soñé
`,
    theme: { mode: "dark", colors: ["#060B1A", "#1A0B16", "#0EA5E9", "#FB7185"] },
  },
  {
    id: "04",
    title: "Laura No Está",
    artist: "Nek",
    album: "Entre Tú y Yo",
    src: `${BASE_URL}media/04.mp3`,
    cover: `${BASE_URL}covers/04.jfif`,
    dedication: `Esta canción dudé en ponerla pero la verdad que es bastante buena y honestamente creo que puede representar el hecho que ambos hemos pasado por relaciones que de una u otra forma se volvieron tóxicas y a pesar que queríamos estar ahí terminamos lastimados y pues, siento que esta canción me recuerda a ti porque simboliza un nuevo comienzo, dejar el pasado atrás y enfocarse en construir un nuevo amor.

Porque eso es lo que quiero hacer, construir solo momentos bonitos contigo y que me permitas quererte todo el tiempo.`,
    lyrics: `Laura no está, Laura se fue
Laura se escapa de mi vida
Y tú, que sí estás, preguntas por qué
La amo a pesar de las heridas

Lo ocupa todo su recuerdo
No consigo olvidar
El peso de su cuerpo

Laura no está, eso lo sé
Y no la encontraré en tu piel
Es enfermizo, sabes que no quisiera
Besarte a ti pensando en ella

Esta noche, inventaré una tregua
Ya no quiero pensar más
Contigo olvidaré su ausencia

Y si te como a besos, tal vez
La noche sea más corta, no lo sé
Yo solo no me basto, quédate
Y lléname su espacio, quédate
Quédate (uoh-oh, uh)

Laura se fue, no dijo adiós
Dejando rota mi pasión
Laura quizá ya me olvidó
Y otro rozó su corazón

Y yo solo sé decir su nombre
No recuerdo ni siquiera el mío
¿Quién me abrigará este frío?

Y si te como a besos, tal vez
La noche sea más corta, no lo sé
Yo solo no me basto, quédate
Y lléname su espacio, quédate
Quédate (uh)

Puede ser difícil para ti
Pero no puedo olvidarla
Creo que es lógico
Por más que yo intente escaparme, ¡ella está!

Unas horas jugaré a quererte
Pero cuando vuelva a amanecer
Me perderás para siempre

Y si te como a besos, sabrás
Lo mucho que me duele este dolor
No encontraré en tu abrazo el sabor
De los sueños que Laura me robó

Si me enredo en tu cuerpo, sabrás
Que solo Laura es dueña de mi amor
No encontraré en tu abrazo el sabor
De los besos que Laura me robó, me robó`,
    theme: { mode: "light", colors: ["#FFF5F5", "#FFE0E0", "#EC4899", "#F59E0B"] },
  },
  {
    id: "05",
    title: "Quieres Ser Mi Amante",
    artist: "Camilo Sesto",
    album: "Camilo Sesto",
    src: `${BASE_URL}media/05.mp3`,
    cover: `${BASE_URL}covers/05.jfif`,
    dedication: `Sabes que me puse a pensar, que ya que me invitaste a comer con tu quincena 25, que me gustaría ir contigo a la playa y gastarnos mi quincena 25 jajaja xD ¿Qué te parece?

Tú y yo, playita, nos comemos un cóctel y una minuta, hacemos un picnic mientras escuchamos buena música, pasamos ahí la tarde esperando el atardecer.

Me gustaría saber si quieres vivir ese tipo de aventuras conmigo, aunque así como somos de salados capaz nos encontramos al inge colochito ahí jajajajajaj xD bromas. Pero sí me gustaría vivir esas aventuras contigo, aún tenemos pendientes la salida al cine y gritar "Cineeeee, melanii" xD`,
    lyrics: `Decir "te quiero", decir "amor"
No significa nada
Las palabras sinceras, las que tienen valor
Son las que salen del alma
Y en mi alma nacen
Solo palabras blancas
Preguntas sin respuesta
Llenas de esperanza
Un amor como el mío no se puede ahogar
Como una piedra en un río
Un amor como el mío no se puede acabar
Ni estando lejos te olvido
Y no se puede quemar
Porque está hecho de fuego
Ni perder, ni ganar
Porque este amor no es un juego
Sueños que son amor
Son sueños que son dolor
Y yo necesito saber
Si quieres ser mi amante
Es bonito reír, amar y vivir
Todo por alguien
Y, si es preciso, sufrir, llorar o morir
Por ese alguien
Yo necesito saber
Si quieres ser mi amante
Yo necesito saber
Si quieres ser mi amante
Sueños que son amor
Son sueños que son dolor
Y yo necesito saber
Si quieres ser mi amante
Sueños que son amor
Son sueños que son dolor
Y yo necesito saber
Si quieres ser mi amante
Pero, contigo
(Vivir o morir, vivir o morir) Si quieres ser mi amante
(Vivir o morir, vivir o morir) Pero, contigo
(Vivir o morir, vivir o morir) Si quieres ser mi amante`,
    theme: { mode: "dark", colors: ["#05070E", "#111827", "#B91C1C", "#60A5FA"] },
  },
  {
    id: "06",
    title: "She's a Lady",
    artist: "Tom Jones",
    album: "She's a Lady",
    src: `${BASE_URL}media/06.mp3`,
    cover: `${BASE_URL}covers/06.jfif`,
    dedication: `Te cuento un secreto: Hay un modal que se dispara cuando termines de escuchar por completo todas las canciones y tiene indicaciones para el siguiente paso que debes seguir...`,
    lyrics: `Ella es una dama
She's a Lady
Bueno, ella es todo lo que querrías
Well she's all you'd ever want

Es del tipo que les gustaría hacer alarde y llevar a cenar
She's the kind they'd like to flaunt and take to dinner

Bueno, ella siempre conoce su lugar
Well she always knows her place

Tiene estilo, tiene gracia, es una ganadora
She's got style, she's got grace, she's a winner


Ella es una dama, whoa whoa whoa, ella es una dama
She's a lady, whoa whoa whoa, she's a lady

Hablando de esa señorita, y la señora es mía
Talkin' about that little lady, and the lady is mine


Bueno, ella nunca está en el camino
Well she's never in the way

Siempre algo agradable para decir, oh qué bendición
Always something nice to say, oh what a blessing

Puedo dejarla sola
I can leave her on her own

Sabiendo que está bien sola, y no hay ningún lío
Knowing she's okay alone, and there's no messing


Es una dama. Whoa whoa whoa whoa, ella es una dama
She's a lady. Whoa whoa whoa, she's a lady

Hablando de esa señorita, y la señora es mía
Talkin' about that little lady, and the lady is mine


Bueno, ella nunca pide mucho y yo no la rechazo
Well she never asks for very much and I don't refuse her

Siempre tratarla con respeto, nunca abusaría de ella
Always treat her with respect, I never would abuse her

Lo que tiene es difícil de encontrar, y no quiero perderla
What she's got is hard to find, and I don't want to lose her

Ayúdame a construir una montaña de mi pequeña pila de arcilla
Help me build a mountain from my little pile of clay, hey, hey, hey


Bueno, ella sabe lo que soy
Well she knows what I'm about

Ella puede tomar lo que yo plato, y eso no es fácil
She can take what I dish out, and that's not easy

Bueno, ella me conoce a través y a través de
Well she knows me through and through

Ella sabe exactamente qué hacer, y cómo complacerme
She knows just what to do, and how to please me


Ella es una dama, whoa whoa whoa, ella es una dama
She's a lady, whoa whoa whoa, she's a lady

Hablando de esa señorita, y la señora es mía
Talkin' about that little lady, and the lady is mine

Sí, sí, sí, es una dama
Yeah yeah yeah, she's a lady

Escúchame, nena, es una dama
Listen to me baby, she's a lady

Whoa whoa whoa whoa, ella es una dama
Whoa whoa whoa, she's a lady

Y la señora es mía
And the lady is mine


Sí, sí, sí, es una dama
Yeah yeah yeah, she's a lady

Hablando de esta señorita
Talkin' about this little lady

Espera, espera, espera, espera
Whoa whoa whoa whoa

Y la señora es mía
And the lady is mine


Sí, sí, es una dama
Yeah yeah, she's a lady

Y la señora es mía
And the lady is mine`,
    theme: { mode: "light", colors: ["#FFF8F0", "#FFE8D8", "#F97316", "#EF4444"] },
  },
  {
    id: "07",
    title: "Corazón Encantado",
    artist: "Diana Salas",
    album: "Dragon Ball GT",
    src: `${BASE_URL}media/07.mp3`,
    cover: `${BASE_URL}covers/07.jfif`,
    dedication: `Dejé la mejor canción para el final, la canción que más me gusta de esta lista, no solo porque está ligada a mi infancia también porque me nace dedicarte cada verso de esa canción. Así que con eso me despido, espero que te haya gustado, solo diré que te quiero mucho y prometo hacerlo por mucho tiempo.

Así que te dejo para que la escuches, ¡Fíjate en la letra!`,
    lyrics: `En el instante en que te volví a encontrar
Mi mente trajo a mí aquel hermoso lugar
Que cuando era niño fue tan valioso para mí
Quiero saber si acaso tú conmigo quieres bailar
Si me das tu mano te llevaré
Por un camino cubierto de luz y oscuridad
Tal vez sigues pensando en él
No puedo yo saberlo, pero sé y entiendo
Que amor necesitas tú
Y el valor para pelear en mí lo hallarás
Mi corazón encantado vibra
Por el polvo de esperanza y magia
Del universo que
Ambicionan todos poseer
Voy a amarte para toda la vida
No me importa si aún no te intereso
Ven toma mi mano
Para huir de esta infinita oscuridad

En el instante en que te volví a encontrar
Mi mente trajo a mí aquel hermoso lugar
Que cuando era niño fue tan valioso para mí
Quiero saber si acaso tú conmigo quieres bailar
Si me das tu mano te llevaré
Por un camino cubierto de luz y oscuridad
Tal vez sigues pensando en él
No puedo yo saberlo, pero sé y entiendo
Que amor necesitas tú
Y el valor para pelear en mí lo hallarás

(canta en japones) 

Mi corazón encantado vibra
Por el polvo de esperanza y magia
Del universo que
Ambicionan todos poseer
Voy a amarte para toda la vida
No me importa si aún no te intereso
Ven toma mi mano
Para huir de esta infinita oscuridad`,
    theme: { mode: "dark", colors: ["#06121E", "#140B2A", "#38BDF8", "#A78BFA"] },
  },
];
