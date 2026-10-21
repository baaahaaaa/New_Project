# Plateforme éducative — Prototype Full-Stack

Prototype académique comprenant un **frontend Next.js** et un **backend NestJS**. Ce dépôt présente une base de développement, pas une application de production vérifiée.

## Architecture du dépôt

| Dossier | Technologie | Rôle |
|---|---|---|
| `educational-platform/` | Next.js 15, React 19, TypeScript, Tailwind CSS 4 | Interface web |
| `backend/` | NestJS 11, TypeScript, TypeORM | API et gestion des utilisateurs |

Côté backend, les modules visibles incluent `AuthModule`, `UsersModule`, JWT et PostgreSQL. Les fonctionnalités métiers complètes, leur intégration au frontend et les tests end-to-end restent à valider.

## Démarrage en développement

Pré-requis : une version de Node.js compatible avec les dépendances du projet, npm et PostgreSQL.

Backend (terminal 1) :

```powershell
cd backend
npm ci
Copy-Item .env.example .env
# Modifier .env : configuration de la base et clé JWT de développement
npm run start:dev
```

Frontend (terminal 2, depuis la racine du dépôt) :

```powershell
cd educational-platform
npm ci
npm run dev
```

Le frontend utilise le serveur Next.js (port 3000 par défaut). Vérifier dans le code la configuration de l'URL d'API avant de tester les parcours complets.

## Tests et qualité

```powershell
# depuis backend/
npm run build
npm test -- --runInBand
npm run test:e2e

# depuis educational-platform/
npm run lint
npm run build
```

Ces commandes sont **à exécuter et à corriger si nécessaire** ; aucune réussite n'est présumée.

## Sécurité : attention avant tout déploiement

- **Ne pas** versionner les fichiers `.env`, tokens, mots de passe ou données personnelles.
- `backend/src/app.module.ts` utilise actuellement `synchronize: true` dans TypeORM. Cette option doit être désactivée en production et remplacée par des migrations versionnées.
- Utiliser un secret JWT robuste, des accès PostgreSQL limités et des tests d'autorisation.
- Les fichiers de logs de développement suivis dans `educational-platform/` devraient être retirés de Git après examen ; le kit n'efface pas automatiquement ces fichiers.
- Les READMEs des sous-dossiers contiennent encore le texte standard des frameworks et doivent être personnalisés.

**Statut :** prototype technique présent, tests locaux et revue de sécurité à terminer.
