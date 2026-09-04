/* =========================================================
   AP2MD CONNECT PRO
   Application JavaScript principale
   ONG AP2MD-Douké
   ========================================================= */


/* =========================================================
   CONFIGURATION SUPABASE
   ========================================================= */

const AP2MD_CONFIG = {

  supabaseUrl:
    'https://pturkucczqqioivapjcr.supabase.co',

  supabasePublishableKey:
    'sb_publishable_GO8o-jJp97DG0poviRApzQ_v3CgaqRT'

};


/* =========================================================
   INITIALISATION SUPABASE
   ========================================================= */

const sb =
  window.supabase.createClient(
    AP2MD_CONFIG.supabaseUrl,
    AP2MD_CONFIG.supabasePublishableKey
  );


/* =========================================================
   OUTIL DE SELECTION
   ========================================================= */

const $ = (id) =>
  document.getElementById(id);


/* =========================================================
   ETAT AUTHENTIFICATION
   ========================================================= */

let signup = false;


/* =========================================================
   ANNEE AUTOMATIQUE
   ========================================================= */

if ($('year')) {

  $('year').textContent =
    new Date().getFullYear();

}


/* =========================================================
   MENU MOBILE
   ========================================================= */

if ($('menuBtn') && $('nav')) {

  $('menuBtn').onclick = () => {

    $('nav').classList.toggle('open');

  };

}


/* =========================================================
   MODALE AUTHENTIFICATION
   ========================================================= */

const modal =
  $('authModal');


/* =========================================================
   OUVRIR AUTHENTIFICATION
   ========================================================= */

function openAuth() {

  if (!modal) {
    return;
  }

  modal.classList.remove('hidden');

  modal.setAttribute(
    'aria-hidden',
    'false'
  );

  if ($('email')) {

    $('email').focus();

  }

}


/* =========================================================
   FERMER AUTHENTIFICATION
   ========================================================= */

function closeAuth() {

  if (!modal) {
    return;
  }

  modal.classList.add('hidden');

  modal.setAttribute(
    'aria-hidden',
    'true'
  );

  if ($('authMsg')) {

    $('authMsg').textContent =
      '';

  }

}


/* =========================================================
   BOUTON CONNEXION
   ========================================================= */

if ($('loginBtn')) {

  $('loginBtn').onclick =
    openAuth;

}


/* =========================================================
   BOUTON CONNEXION HERO
   ========================================================= */

if ($('heroLogin')) {

  $('heroLogin').onclick =
    openAuth;

}


/* =========================================================
   BOUTON CTA CONNEXION
   ========================================================= */

if ($('ctaLogin')) {

  $('ctaLogin').onclick =
    openAuth;

}


/* =========================================================
   FERMETURE MODALE
   ========================================================= */

if ($('closeModal')) {

  $('closeModal').onclick =
    closeAuth;

}


/* =========================================================
   FERMER EN CLIQUANT A L'EXTERIEUR
   ========================================================= */

if (modal) {

  modal.addEventListener(
    'click',
    (event) => {

      if (
        event.target === modal
      ) {

        closeAuth();

      }

    }
  );

}


/* =========================================================
   BASCULE CONNEXION / INSCRIPTION
   ========================================================= */

if ($('toggleSignup')) {

  $('toggleSignup').onclick =
    () => {

      signup =
        !signup;


      /* -----------------------------------------
         TITRE
      ----------------------------------------- */

      if ($('authTitle')) {

        $('authTitle').textContent =
          signup
            ? 'Créer un compte'
            : 'Connexion';

      }


      /* -----------------------------------------
         DESCRIPTION
      ----------------------------------------- */

      if ($('authHint')) {

        $('authHint').textContent =
          signup

            ? 'Créez votre accès sécurisé à AP2MD CONNECT PRO.'

            : 'Accédez à votre espace sécurisé AP2MD-Douké.';

      }


      /* -----------------------------------------
         BOUTON PRINCIPAL
      ----------------------------------------- */

      if ($('authSubmit')) {

        $('authSubmit').textContent =
          signup
            ? 'Créer le compte'
            : 'Se connecter';

      }


      /* -----------------------------------------
         LIEN DE BASCULE
      ----------------------------------------- */

      $('toggleSignup').textContent =
        signup

          ? 'J’ai déjà un compte'

          : 'Créer un compte';

    };

}


/* =========================================================
   FORMULAIRE AUTHENTIFICATION
   ========================================================= */

if ($('authForm')) {

  $('authForm').onsubmit =
    async (event) => {

      event.preventDefault();


      /* -----------------------------------------
         RECUPERATION DES CHAMPS
      ----------------------------------------- */

      const email =
        $('email')
          ? $('email')
              .value
              .trim()
          : '';

      const password =
        $('password')
          ? $('password')
              .value
          : '';


      const msg =
        $('authMsg');


      /* -----------------------------------------
         VERIFICATION EMAIL
      ----------------------------------------- */

      if (!email) {

        if (msg) {

          msg.textContent =
            'Veuillez saisir votre adresse e-mail.';

        }

        return;

      }


      /* -----------------------------------------
         VERIFICATION MOT DE PASSE
      ----------------------------------------- */

      if (!password) {

        if (msg) {

          msg.textContent =
            'Veuillez saisir votre mot de passe.';

        }

        return;

      }


      /* -----------------------------------------
         MESSAGE CHARGEMENT
      ----------------------------------------- */

      if (msg) {

        msg.textContent =
          'Connexion sécurisée en cours...';

      }


      try {


        /* =================================================
           INSCRIPTION
        ================================================= */

        if (signup) {

          const {

            data,
            error

          } = await sb.auth.signUp({

            email:
              email,

            password:
              password,

            options: {

              data: {

                full_name:
                  email.split('@')[0]

              }

            }

          });


          /* -----------------------------------------
             ERREUR INSCRIPTION
          ----------------------------------------- */

          if (error) {

            throw error;

          }


          /* -----------------------------------------
             SESSION DISPONIBLE
          ----------------------------------------- */

          if (data.session) {

            if (msg) {

              msg.textContent =
                'Compte créé. Ouverture de votre espace...';

            }


            window.location.href =
              'dashboard.html';


          } else {

            /* ---------------------------------------
               CONFIRMATION EMAIL
            --------------------------------------- */

            if (msg) {

              msg.textContent =
                'Compte créé. Vérifiez votre e-mail si une confirmation est demandée.';

            }

          }


          return;

        }


        /* =================================================
           CONNEXION
        ================================================= */

        const {

          data,
          error

        } = await sb.auth.signInWithPassword({

          email:
            email,

          password:
            password

        });


        /* -----------------------------------------
           ERREUR CONNEXION
        ----------------------------------------- */

        if (error) {

          throw error;

        }


        /* -----------------------------------------
           VERIFICATION SESSION
        ----------------------------------------- */

        if (data.session) {

          if (msg) {

            msg.textContent =
              'Connexion réussie. Ouverture du Dashboard...';

          }


          /* ---------------------------------------
             REDIRECTION PRINCIPALE
          --------------------------------------- */

          window.location.href =
            'dashboard.html';

        } else {

          if (msg) {

            msg.textContent =
              'La connexion n’a pas pu être établie.';

          }

        }


      }


      /* =================================================
         GESTION DES ERREURS
      ================================================= */

      catch (error) {

        console.error(
          'Erreur AP2MD CONNECT PRO :',
          error
        );


        let message =
          'Une erreur est survenue. Veuillez réessayer.';


        if (
          error &&
          error.message
        ) {

          message =
            error.message;

        }


        if (msg) {

          msg.textContent =
            message;

        }

      }

    };

}


/* =========================================================
   VERIFICATION AUTOMATIQUE DE LA SESSION
   ========================================================= */

sb.auth.onAuthStateChange(
  (event, session) => {

    console.log(
      'Etat authentification AP2MD :',
      event
    );


    /* -----------------------------------------
       SESSION DISPONIBLE
    ----------------------------------------- */

    if (
      event === 'SIGNED_IN' &&
      session
    ) {

      /*
       * La redirection principale est déjà
       * effectuée après signInWithPassword().
       *
       * Cette écoute permet simplement de
       * maintenir la synchronisation Supabase.
       */

      console.log(
        'Session AP2MD CONNECT PRO active.'
      );

    }


    /* -----------------------------------------
       DECONNEXION
    ----------------------------------------- */

    if (
      event === 'SIGNED_OUT'
    ) {

      console.log(
        'Session AP2MD CONNECT PRO fermée.'
      );

    }

  }
);


/* =========================================================
   PROTECTION CONTRE LES ERREURS DE CHARGEMENT
   ========================================================= */

window.addEventListener(
  'error',
  (event) => {

    console.error(
      'Erreur JavaScript AP2MD CONNECT PRO :',
      event.error || event.message
    );

  }
);


/* =========================================================
   FIN AP2MD CONNECT PRO
   ========================================================= */
