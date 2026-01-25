// Modo NO: Contenido melancólico/triste
// Tracks con ambientación más oscura para cuando la respuesta es "No"

const BASE_URL = import.meta.env.BASE_URL;

export const NO_CONFIG = {
  ui: {
    title: "A veces las cosas no salen como esperamos.",
    titleEmoji: "🌧️💔",
    subtitle: "Pero incluso en la lluvia hay belleza. Estas canciones me acompañaron en momentos difíciles.",
    badgeText: "7 canciones • reflexiones • melancolía",
    footerText: "Algunas historias no tienen final feliz, y está bien. 🖤",
    playlistHint: "Cada canción tiene una historia detrás. Lee las reflexiones cuando estés listo/a.",
    playlistHintEmoji: "🌙📝",
  },
  onboarding: [
    {
      icon: "CloudRain",
      title: "A veces el cielo también llora. 🌧️",
      content: "No todo siempre sale como lo planeamos. A veces las personas que más queremos no sienten lo mismo, y eso está bien.\n\nEste espacio es para esos momentos donde necesitas sentir, sin fingir que todo está bien.",
    },
    {
      icon: "Music2",
      title: "Música para el alma rota. 💔🎧",
      content: "Seleccioné estas canciones porque me ayudaron a procesar emociones difíciles. No son canciones alegres, pero son honestas.\n\nA veces necesitamos permitirnos estar tristes para después poder sanar.",
    },
    {
      icon: "ListOrdered",
      title: "Antes de empezar:",
      bullets: [
        "No tienes que escucharlas todas de una vez.",
        "Cada canción tiene una reflexión personal.",
        "Está bien si te sientes identificado/a con alguna.",
        "Recuerda: sentir no es debilidad.",
      ],
      callout: "Tómate tu tiempo. No hay prisa.",
    },
  ],
};

export const NO_TRACKS = [
  {
    id: "n01",
    title: "Let Me Down",
    artist: "Oliver Tree",
    album: "Alien Boy EP",
    src: `${BASE_URL}media/08.mp3`,
    cover: `${BASE_URL}covers/08.jpg`,
    dedication: `Esta canción representa mucho, porque cuando la escucho me identifico con el deseo de no repetir errores del pasado, de no verme al espejo y decir "Enserio hice todo lo que pude y aún así no fue suficiente". Porque cuando te conocí no me imagine estar en este contexto contigo en este momento, pero cuando tomé el riesgo de hacerte un detalle y el riesgo de intentar ser parte de tu vida pues... yo te veía con dudas y me repetía esto en mi cabeza: 

"Porfavor no me decepciones" 

y si te soy honesto, si estoy decepcionado, porque siento que no te haces responsable de tu parte (porque esto es de dos) y habían días que parecias quererme mucho y al día siguiente parecía que no era así y a pesar de eso quise quedarme a descubrir que era, aun así estoy aquí intentando hacer algo por ti pueda tener significado, pero, me decepciona porque cuando de verdad siento que es importante tu respuesta nunca la das, porque te escribí una carta y aún sigo esperando una respuesta y esta nunca llego.

Siento que deposité mi confianza en ti y a pesar de todo lo bonito pues... al parecer no merezco nisiquiera tu rechazo y eso me hace sentir muy mal, porque parece que tienes lastima de decirme las cosas y odio eso. No quiero tu lastima mas bien el respeto porque yo con respeto aceptaré tu respuesta, porque te quiero lo suficiente como para saber soltarte.
`,
    lyrics: `Por favor, no me decepciones
Please don't let me down

Por favor, no me decepciones
Please don't let me down

Es mejor que vengas
You better come around

Te salvas a ti misma
You save yourself

Me salvaré esta vez
I’ll save myself this time around

Te salvas a ti misma
You save yourself

Puedo salvarte la proxima vez
I’ll save you too next time around

No estoy por aquí, no he estado aquí por un tiempo
I’m not around, I haven’t been here for a while

Sabes que ahora nunca volveré
You know I’ll never be back now

Por favor, no me decepciones
Please don’t let me down

Por favor, no me decepciones
Please don’t let me down

Es mejor que vengas
You better come around

No voy a venir
I won’t come around

Es la misma mierda de siempre, me estoy cansando de eso
It’s the same old shit, I’m getting sick of it

Sigue siendo la misma mierda de siempre, deja de aguantar
It’s still the same old shit, stop putting up with it

De alguna manera logré verlo, eres otra persona
Somehow I’ve seen, you’re someone else

De alguna manera lo he visto, te convertiste en otra persona
Somehow I’ve seen, you turned into someone else

Por favor, no me decepciones
Please don’t let me down

Por favor, no me decepciones
Please don’t let me down

Es mejor que vengas
You better come around

No voy a venir
I won’t come around`,
    theme: { mode: "dark", colors: ["#0a0a0f", "#1a1a2e", "#6b7280", "#4b5563"] },
  },
  {
    id: "n02",
    title: "Lo que hay x aquí",
    artist: "Rels B",
    album: "Flakk",
    src: `${BASE_URL}media/09.mp3`,
    cover: `${BASE_URL}covers/09.jfif`,
    dedication: `Si fuese por mi, dejariamos los enojos a un lado y comenzariamos a resolver nuestras diferencias con palabras y acciones, Si fuese por mi estaría tomando tu mano en este momento, si fuese por mi seguiríamos intentando construir algo bonito aqui, pero... no se puede.

dejame decirte que, lamento que no hice las cosas bien, lamento no estar a la altura, quizá al final eras demasiado para mi y vendrá alguién mejor que yo a cuidarte y de corazón espero que sea así porque si al final me vas a friendzonear para andar con alguien peor nombe, mejor mierdota jajaja xD. Aunque digo todo esto en el fondo también sé bien lo que ofrezco, soy un chico Inteligente, chistoso, detallista, Estudioso, trabajador, cocino rico, nos gusta la misma musica ,siempre ando ganas (osea nunca te diria que no) y siempre ando dinero en la bolsa y a parte soy un tipo de hogar y mi lenguaje del amor es cuidar y alimentar y pues... viendolo así, no soy un mal partido por eso también me pone triste el pensar que no pudimos disfrutar de una relación que prometia ser sana, bonita y llena de aventuras. 

Espero y confío que podremos vivir muchas como amigos. `,
    lyrics: `¿Yo nunca te he hablado de ella?
Ella era como
Como una puesta de sol, ¿sabes?
Como ver el mar después de mucho tiempo
Mi hogar
¿Quién estará besando esos labio'?
Me tiene pensando, yo antes no era así
Seguro es un tipo más guapo que yo
Ella era demasiado guapa para mí
Dime, de qué sirve toda esta ambición
Si al llegar no tengo con quién compartir
Que no la perdiera, mamá me avisó
Y yo como un tonto fue que la perdí
Ya no tengo a quién mandar estos TikToks
Ni con quién criticar to antes de dormir
Sus amigas dicen que es mejor que yo
Y que se la ve mucho mejor así
Y aunque duela, es verdad
Porque ser mejor es muy fácil
¿Y pa qué iba a volver a buscarme?
Si no echa de menos lo que hay por aquí, yeah
Amanecí pensando en ti, mi amor
Entré a tus redes pa ver cómo estás
Vi que hace poco cambiaste de look
Y aún no borraste la foto nuestra
Me salió un recuerdo de nosotros dos
De la noche desnudos, bebiendo en el mar
Y me puso triste pensar que ya no
Y que hay otro que ahora ocupa mi lugar
Por lo menos ahora no te piden fotos
Entrando en el cine o en el restaurant
Y todas las cosas que querías hacer
Y que por ser quien soy, tuviste que cortar
Ojalá que guardes el primer anillo
Que pude comprarte con la música
Y que me recuerdes como el primer día
Oh-oh, oh-oh
Skinny
¿Quién estará besando esos labio'?
Me tiene pensando, yo antes no era así
Seguro es un tipo más guapo que yo
Ella era demasiado guapa para mí
Dime, de qué sirve toda esta ambición
Si al llegar no tengo con quién compartir
Que no la perdiera, mamá me avisó
Y yo como un tonto fue que la perdí
Y aunque duela, es verdad
Porque ser mejor es muy fácil
¿Y pa qué iba a volver a buscarme?
Si no echa de menos lo que hay por aquí`,
    theme: { mode: "dark", colors: ["#0f0f1a", "#1e1e3f", "#8b5cf6", "#7c3aed"] },
  },
  {
    id: "n03",
    title: "Colapso",
    artist: "Kevin Kaarl",
    album: "París Texas",
    src: `${BASE_URL}media/10.mp3`,
    cover: `${BASE_URL}covers/10.jfif`,
    dedication: `Espero que cuando escuchas estas canciones recuerdes que cuando yo las escucho es porque te quiero y aunque ya no proyectemos estar juntos como pareja yo siempre voy a revivir lo bonito que pasamos juntos en cada canción que me haga pensar en ti, pero como vos misma me dijiste: "querer a alguién también es dejarlo ir..." y decirlo creo que es mas facil que hacerlo pero hoy lo pondré en practica.`,
    lyrics: `Hoy creí que ya volvió
Que todo iba ya mejor
Pero fue un sueño y nada más
Y yo ya pido una señal

Dios, dame fuerza, que ya me voy a rendir
Dios, dame fuerza, que siento que yo ya perdí

Y no, no, no, no
No sé pa' dónde voy
Sigo varado, esperando a que ella diga algo
Y no, no, no, no

Creo que yo ya voy dudando
De si algún día ella me amó

Ya no pienses tanto
Claro que ella te amó
Solo fue un colapso
Al rato volverá a brillar
Aunque tal vez ya no para ti
Lo importante es que sea feliz

¿Y qué hay de mí? Yo sigo aquí
Yo también quiero ser feliz
Mira, mi amor, yo sigo aquí
Yo sigo estando para ti

Hoy sigo estando para ti
Hoy sigo estando para ti
Hoy sigo estando para ti
Hoy sigo estando para ti
Hoy sigo estando para ti`,
    theme: { mode: "dark", colors: ["#0d0d12", "#1f1f2e", "#a78bfa", "#8b5cf6"] },
  },
  {
    id: "n04",
    title: "Dueles tan bien",
    artist: "Bruses",
    album: "Dueles tan bien (Single)",
    src: `${BASE_URL}media/11.mp3`,
    cover: `${BASE_URL}covers/11.jpg`,
    dedication: `Escuchando esta canción me di cuenta que en este momento no sé que hago más, si quererte o extrañarte. :(`,
    lyrics: `Siempre
He creído lo que me han vendido en la tele y el cine
Qué triste
Quieren
Que crea en el para siempre y finales felices
Qué triste
Pa ra ra ra ra, ra ra ra
Siempre acabo mal
Y me quiero matar
Porque
Dueles, dueles, dueles
Más de lo que debes
Dueles, dueles
Y dueles tan bien
Que no sé qué hacer
Dueles, dueles, dueles
Más de lo que debes
Dueles, dueles
Y dueles tan bien
Que me intoxiqué contigo
Sabes
Me sabes mejor que el alcohol
Lo sabes y tienes control
De toda mi estabilidad
Mi estado de salud mental
Cuidado (cuidado)
Cuidado (cuidado)
Cuidado me puedo quebrar
Porque
Dueles, dueles, dueles
Más de lo que debes
Dueles, dueles
Y dueles tan bien
Que no sé qué hacer
Dueles, dueles, dueles
Más de lo que debes
Dueles, dueles
Y dueles tan bien
Que me intoxiqué contigo
Siempre acabo mal
Y me quiero matar
Porque
Dueles, dueles, dueles
Más de lo que debes
Dueles, dueles
Y dueles tan bien
Que no sé qué hacer
Dueles, dueles, dueles
Mas de lo que debes
Dueles, dueles
Y dueles tan bien
Que me intoxiqué contigo
Contigo
Contigo
Dueles, dueles, dueles, dueles tan bien`,
    theme: { mode: "dark", colors: ["#0c0c14", "#1a1a2e", "#ec4899", "#db2777"] },
  },
  {
    id: "n05",
    title: "¿Por qué te vas?",
    artist: "Jeanette",
    album: "Porque te vas",
    src: `${BASE_URL}media/12.mp3`,
    cover: `${BASE_URL}covers/12.jfif`,
    dedication: `¨Bueno y vos! para donde vas?" jajaja eso quisiera preguntarte en este momento, porque siento que te fuiste en el momento que pensé que todo iba bien, se que aveces soy pendejo, medio tonto y hago comentarios que te enojan. Pero creo que no te das cuenta que sos la unica mujer con la que quiero pelear. Porque una relación vale por sus buenos momentos pero tiene mas valor la capacidad de resolver los problemas juntos y en este caso creo que si el cariño que me tienes no supera el enojo temporal de un "comentario" pues... creo que hacemos los correcto al solo ser amigos. 

Eso no evita que te quiera y te piense. Se que a ti quizá no te importa pero... a mi si me gustaría entender el "Porque te vas?" porque recuerda que todas las promesas de mi amor se iran contigo. `,
    lyrics: `Hoy en mi ventana brilla el sol
Y el corazón
Se pone triste contemplando la ciudad
Porque te vas
Como cada noche desperté
Pensando en ti
Y en mi reloj todas las horas vi pasar
Porque te vas
Todas las promesas de mi amor se irán contigo
Me olvidarás
Me olvidarás
Junto a la estación hoy lloraré igual que un niño
Porque te vas
Porque te vas
Porque te vas
Porque te vas
Bajo la penumbra de un farol
Se dormirán
Todas las cosas que quedaron por decir
Se dormirán
Junto a las manillas de un reloj
Esperarán
Todas las horas que quedaron por vivir
Esperarán
Todas las promesas de mi amor se irán contigo
Me olvidarás
Me olvidarás
Junto a la estación hoy lloraré igual que un niño
Porque te vas
Porque te vas
Porque te vas
Porque te vas.`,
    theme: { mode: "dark", colors: ["#0a0a12", "#16162a", "#f59e0b", "#d97706"] },
  },
  {
    id: "n06",
    title: "Ayer y hoy",
    artist: "Julio Jaramillo",
    album: "Grandes Éxitos",
    src: `${BASE_URL}media/13.mp3`,
    cover: `${BASE_URL}covers/13.jfif`,
    dedication: `Ya estoy sin palabras, no sé que mas decir, te quiero, te respeto y sos una gran mujer. No me arrpiento de nada, lo intenté y fracasé pero creo que seria peor no haberlo intentado nunca. 

Espero cuides mucho de tus sentimientos porque creo que ya no seré yo quién se encargue de cuidarlos. 

bye.`,
    lyrics: `Ayer tuve un amor
Que hoy me abandonó
Porque no me quería
Fue tanta mi ilusión
Por hacerla feliz
Pero todo fue en vano

Sus juramentos falsos
Trajeron a mi alma
Tristes esperanzas
Que la vida nos dio
Con todo su fulgor
Caricias y esplendor

Ahora, comprendo
Que todo fue mentira
Sus palabras creí
Ingenuamente yo
Que nunca me engañaba
Ahora estaré solo

Para no sufrir
Así las consecuencias
De un amor tan fugaz
Que solo pudo ser
Solo, un sueño fatal

Hoy sé que por dinero
Te entregas a otro hombre
Dejándome a mí
Abandonado
En esta soledad
Pero no importa
Si tú te burlaste
De mi fiel cariño
Mujer fatal
Algún día la tendrás tú, que pagar

Pero no me importa
Si tú te burlaste
De mi fiel cariño
Mujer fatal
Algún día la tendrás tú, que pagar

Hoy sé que por dinero
Te entregas a otro hombre
Dejándome a mí
Abandonado
En esta soledad

Pero no importa
Si tú te burlaste
De mi fiel cariño
Mujer fatal
Algún día la tendrás tú, que pagar

Pero no importa
Si tú te burlaste
De mi fiel cariño
Mujer fatal
Algún día la tendrás tú, que pagar`,
    theme: { mode: "dark", colors: ["#0b0b15", "#191930", "#94a3b8", "#64748b"] },
  },
  {
    id: "n07",
    title: "Prometido no llorar",
    artist: "Palito Ortega",
    album: "Prometido no llorar",
    src: `${BASE_URL}media/14.mp3`,
    cover: `${BASE_URL}covers/14.jfif`,
    dedication: `Fijate en la letra...`,
    lyrics: `Habíamos prometido no llorar
            Perdóname
            Quizás esta sea la última vez que nos sentamos a tomar un café juntos
            Quizás es la última vez que nos vemos, así que tratemos de estar bien, por favor
            Me quiero llevar como recuerdo una sonrisa
            Por favor no llores más
            Te acuerdas aquella tarde que nos conocimos, fue muy lindo conocerte, fue muy lindo todo lo que pasó entre nosotros, pero ya pasó
            Ahora es necesario separarnos, no sigamos haciéndonos mal, lo nuestro ya se estaba convirtiendo simplemente en una rutina, y el amor, el amor es otra cosa, al amor hay que alimentarlo todos los días con esas pequeñas cosas que nosotros ya perdimos
            Se enfría tu café, aquí nadie se tiene que sentir culpable, la gente nos mira por favor, no llores más
            Te quiero, te quiero
            No, lo nuestro es una costumbre; y el amor es otra cosa
            Ahora me voy, es lo mejor para los dos, te deseo mucha suerte que seas muy feliz, adiós
            Te quiero, te quiero
            Adiós`,
    theme: { mode: "dark", colors: ["#08080e", "#121225", "#60a5fa", "#3b82f6"] },
  },
];
