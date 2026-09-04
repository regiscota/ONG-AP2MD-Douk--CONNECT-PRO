const AP2MD_CONFIG = {
  supabaseUrl: 'https://pturkucczqqioivapjcr.supabase.co',
  supabasePublishableKey: 'sb_publishable_GO8o-jJp97DG0poviRApzQ_v3CgaqRT'
};

const sb = window.supabase.createClient(
  AP2MD_CONFIG.supabaseUrl,
  AP2MD_CONFIG.supabasePublishableKey
);

const $ = (id) => document.getElementById(id);

let signup = false;


/* ================= ANNÉE ================= */

if ($('year')) {
  $('year').textContent = new Date().getFullYear();
}


/* ================= MENU MOBILE ================= */

if ($('menuBtn') && $('nav')) {

  $('menuBtn').onclick = () => {
    $('nav').classList.toggle('open');
  };

}


/* ================= MODALE AUTHENTIFICATION ================= */

const modal = $('authModal');


function openAuth() {

  if (!modal) return;

  modal.classList.remove('hidden');

  modal.setAttribute('aria-hidden', 'false');

  if ($('email')) {
    $('email').focus();
  }

}


function closeAuth() {

  if (!modal) return;

  modal.classList.add('hidden');

  modal.setAttribute('aria-hidden', 'true');

  if ($('authMsg')) {
    $('authMsg').textContent = '';
  }

}


/* ================= BOUTONS CONNEXION ================= */

if ($('loginBtn')) {
  $('loginBtn').onclick = openAuth;
}

if ($('heroLogin')) {
  $('heroLogin').onclick = openAuth;
}

if ($('ctaLogin')) {
  $('ctaLogin').onclick = openAuth;
}

if ($('closeModal')) {
  $('closeModal').onclick = closeAuth;
}


if (modal) {

  modal.addEventListener('click', (event) => {

    if (event.target === modal) {
      closeAuth();
    }

  });

}


/* ================= CONNEXION / INSCRIPTION ================= */

if ($('toggleSignup')) {

  $('toggleSignup').onclick = () => {

    signup = !signup;


    if ($('authTitle')) {

      $('authTitle').textContent =
        signup ? 'Créer un compte' : 'Connexion';

    }


    if ($('authHint')) {

      $('authHint').textContent =
        signup
          ? 'Créez votre accès AP2MD.'
          : 'Accédez à votre espace AP2MD-Douké.';

    }


    if ($('authSubmit')) {

      $('authSubmit').textContent =
        signup
          ? 'Créer le compte'
          : 'Se connecter';

    }


    $('toggleSignup').textContent =
      signup
        ? 'J’ai déjà un compte'
        : 'Créer un compte';

  };

}


/* ================= FORMULAIRE ================= */

if ($('authForm')) {

  $('authForm').onsubmit = async (event) => {

    event.preventDefault();


    const email =
      $('email').value.trim();

    const password =
      $('password').value;


    const msg =
      $('authMsg');


    msg.textContent =
      'Traitement en cours...';


    try {


      /* ===== INSCRIPTION ===== */

      if (signup) {

        const {
          data,
          error
        } = await sb.auth.signUp({

          email: email,

          password: password,

          options: {

            data: {

              full_name:
                email.split('@')[0]

            }

          }

        });


        if (error) {
          throw error;
        }


        if (data.session) {

          window.location.href =
            'admin.html';

        } else {

          msg.textContent =
            'Compte créé. Vérifiez votre e-mail si une confirmation est demandée.';

        }


        return;

      }


      /* ===== CONNEXION ===== */

      const {
        data,
        error
      } = await sb.auth.signInWithPassword({

        email: email,

        password: password

      });


      if (error) {
        throw error;
      }


      if (data.session) {

        msg.textContent =
          'Connexion réussie...';


        window.location.href =
          'admin.html';

      }

    }


    catch (error) {

      console.error(error);


      msg.textContent =
        error.message ||
        'Une erreur est survenue.';

    }

  };

}
