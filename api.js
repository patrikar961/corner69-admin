/* =========================================================
   CORNER69 — branchement Supabase
   Version sans dependance : aucun CDN, aucun import.
   Ce fichier s'ajoute comme les autres scripts du site.

   IDENTIFIANTS A REMPLIR :
     URL_BASE      = l'adresse de votre projet Supabase
     CLE_PUBLIQUE  = votre cle publiable (sb_publishable_...)

   Ces deux valeurs sont PUBLIQUES par nature : elles sont
   faites pour vivre dans un site. Ce qui doit rester secret,
   c'est la cle "secret" / "service_role" du projet.
   Elle ne doit JAMAIS figurer ici.

   Ce fichier ne contient aucun secret.
   ========================================================= */

var CORNER69_API = (function () {
  'use strict';

  var URL_BASE = '';      /* a remplir : adresse de votre projet Supabase */
  var CLE_PUBLIQUE = '';  /* a remplir : votre cle publiable */

  function configure() {
    return URL_BASE.indexOf('supabase.co') > -1 &&
           CLE_PUBLIQUE.length > 20;
  }

  function entetes(extra) {
    var h = {
      'apikey': CLE_PUBLIQUE,
      'Authorization': 'Bearer ' + CLE_PUBLIQUE,
      'Content-Type': 'application/json'
    };
    if (extra) {
      Object.keys(extra).forEach(function (k) { h[k] = extra[k]; });
    }
    return h;
  }

  function appel(chemin, options) {
    if (!configure()) {
      return Promise.resolve({
        ok: false,
        erreur: 'La boutique n\'est pas reliée à sa base de données. Remplissez les identifiants dans api.js.'
      });
    }

    var opt = options || {};
    var url = URL_BASE.replace(/\/+$/, '') + chemin;

    return fetch(url, {
      method: opt.methode || 'GET',
      headers: entetes(opt.entetes),
      body: opt.corps ? JSON.stringify(opt.corps) : undefined
    })
      .then(function (r) {
        return r.text().then(function (texte) {
          var data = null;
          try { data = texte ? JSON.parse(texte) : null; } catch (e) { data = texte; }

          if (!r.ok) {
            var msg = (data && (data.message || data.hint || data.error)) || ('erreur ' + r.status);
            return { ok: false, erreur: String(msg), statut: r.status };
          }
          return { ok: true, data: data };
        });
      })
      .catch(function () {
        return {
          ok: false,
          erreur: 'Connexion impossible. Vérifiez votre réseau, puis réessayez.'
        };
      });
  }

  function rpc(nom, parametres) {
    return appel('/rest/v1/rpc/' + nom, {
      methode: 'POST',
      corps: parametres || {}
    });
  }

  function table(nom, query) {
    return appel('/rest/v1/' + nom + (query ? '?' + query : ''), { methode: 'GET' });
  }

  var CLE_SUIVI = 'corner69.suivi_id';

  function suiviId() {
    var v = null;
    try { v = localStorage.getItem(CLE_SUIVI); } catch (e) { v = null; }

    if (!v) {
      var octets = [];
      if (window.crypto && window.crypto.getRandomValues) {
        var t = new Uint8Array(16);
        window.crypto.getRandomValues(t);
        octets = Array.prototype.slice.call(t);
      } else {
        for (var i = 0; i < 16; i++) octets.push(Math.floor(Math.random() * 256));
      }
      v = octets.map(function (n) { return ('0' + n.toString(16)).slice(-2); }).join('');
      try { localStorage.setItem(CLE_SUIVI, v); } catch (e) {}
    }

    return v;
  }

  function catalogue() {
    return table('produits', 'select=*&actif=eq.true&order=position.asc');
  }

  function reglages() {
    return table('reglages', 'select=*&id=eq.boutique&limit=1');
  }

  function avis() {
    return table('avis', 'select=*&publie=eq.true&order=cree_le.desc&limit=50');
  }

  function creerCommande(commande) {
    return rpc('creer_commande', {
      p_suivi_id:    suiviId(),
      p_client_nom:  commande.nom,
      p_client_tel:  commande.tel,
      p_adresse:     commande.adresse,
      p_code_postal: commande.cp,
      p_ville:       commande.ville,
      p_articles:    commande.articles,
      p_sous_total:  commande.sousTotal,
      p_frais:       commande.frais,
      p_telegram:    commande.telegram || ''
    });
  }

  function suivre() {
    return rpc('suivre_commande', { p_suivi_id: suiviId() });
  }

  function lire(ref) {
    return rpc('lire_commande', { p_ref: ref, p_suivi_id: suiviId() });
  }

  function laisserAvis(note, auteur, texte) {
    return rpc('laisser_avis', { p_note: note, p_auteur: auteur, p_texte: texte });
  }

  function adminVerifier(motDePasse) {
    return rpc('admin_verifier', { p_mot_de_passe: motDePasse });
  }

  function adminCommandes(motDePasse) {
    return rpc('admin_commandes', { p_mot_de_passe: motDePasse });
  }

  function adminAvancer(motDePasse, ref, sens) {
    return rpc('admin_avancer', {
      p_mot_de_passe: motDePasse,
      p_ref: ref,
      p_sens: sens
    });
  }

  function adminProduit(motDePasse, produit) {
    return rpc('admin_produit', {
      p_mot_de_passe: motDePasse,
      p_id:          produit.id,
      p_nom:         produit.nom,
      p_rayon:       produit.rayon,
      p_prix:        produit.prix,
      p_stock:       produit.stock,
      p_format:      produit.format || '',
      p_emoji:       produit.emoji || '',
      p_description: produit.description || ''
    });
  }

  return {
    configure: configure,
    suiviId: suiviId,
    catalogue: catalogue,
    reglages: reglages,
    avis: avis,
    creerCommande: creerCommande,
    suivre: suivre,
    lire: lire,
    laisserAvis: laisserAvis,
    adminVerifier: adminVerifier,
    adminCommandes: adminCommandes,
    adminAvancer: adminAvancer,
    adminProduit: adminProduit
  };
})();
