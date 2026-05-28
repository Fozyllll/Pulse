# PULSE — Twin-Stick Survivor

Un jeu d'action twin-stick jouable directement dans le navigateur, sans installation.  
Disponible en tant que PWA installable sur mobile et desktop.

## 🎮 Fonctionnalités

- **5 modes de jeu** : Classique, Hardcore, Chrono, Arène, Défi du Jour
- **Multijoueur en ligne** : co-op et duel PvP en temps réel
- **Duo local** : deux joueurs sur le même écran
- **Système d'upgrades** : choix d'améliorations à chaque niveau
- **Reliques** : bonus passifs à équiper avant la partie
- **Passe de combat** : 30 niveaux de récompenses
- **Boutique** : skins, reliques, améliorations permanentes
- **Classement mondial** et historique local
- **Succès** : 40+ succès à débloquer
- **Contrôleur** : support manette gamepad complet
- **PWA** : fonctionne hors ligne après la première visite

## 🚀 Lancer le jeu

Ouvrir `index.html` dans un navigateur moderne, ou déployer sur un hébergeur HTTPS (Netlify, GitHub Pages, Vercel…).

> **Important** : le multijoueur en ligne et la synchronisation cloud nécessitent un backend Supabase configuré.

## 📁 Structure

```
index.html      — Jeu complet (HTML + CSS + JS en un seul fichier)
manifest.json   — Manifeste PWA
sw.js           — Service Worker (cache offline)
icon-192.png    — Icône 192×192
icon-512.png    — Icône 512×512
privacy.html    — Politique de confidentialité
screenshot-wide.png    — Capture d'écran desktop (PWA store)
screenshot-narrow.png  — Capture d'écran mobile (PWA store)
```

## ⚙️ Configuration Supabase

Dans `index.html`, remplace les constantes `SUPABASE_URL` et `SUPABASE_ANON_KEY` par tes propres valeurs Supabase.

## 📄 Licence

Projet indépendant — tous droits réservés.
