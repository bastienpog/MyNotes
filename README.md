# 📝 myNotes

**Mobile Notes App for Azienda**  
Projet développé dans le cadre de la formation à L'École Multimédia  
Développeur : Bastien Pognon
Classe : CDA2 A

---

## 📌 Description

**myNotes** est une application mobile de prise de notes interne à l’entreprise **Azienda**.  
Elle permet aux collaborateurs de :

- créer, modifier, supprimer et consulter des notes,
- leur attribuer une priorité (Important / Normal / Pense-bête),
- stocker les données **localement** (pas de cloud),
- conserver les données même après fermeture de l'appareil.

---

## 🚀 Fonctionnalités

- ✅ Affichage de toutes les notes (dashboard)
- ✅ Création d’une nouvelle note
- ✅ Édition et suppression d’une note
- ✅ Stockage local via `AsyncStorage`
- ✅ Gestion de la priorité via code couleur
- ✅ Interface responsive (téléphone & tablette)

---

## 🧱 Architecture

- **app/** : Pages de l’application (dashboard, note, formulaire)
- **components/ui/** : Composants réutilisables (NoteCard, SearchBar, etc.)
- **utils/** : Fonctions utilitaires (`noteStorage.js`)
- **assets/** : Images, polices, etc.
- **hooks/**, **constants/**, **scripts/** : Organisation évolutive

Architecture logicielle en 3 couches :

- Présentation → `app/`, `components/`
- Métier → `utils/noteStorage.js`
- Données → `AsyncStorage`
- Sécurité intégrée (voir section dédiée)

---

## 🔒 Stratégie de sécurité

- Aucune donnée sensible n’est stockée
- Stockage local uniquement (pas d’API, pas de cloud)
- Suppression confirmée via modale
- Respect des bonnes pratiques RGPD

---

## 🌱 Éco-conception

- Stockage local pour réduire le trafic réseau
- UI minimaliste pour économiser l’énergie
- Code modulaire et réutilisable

---

## 🛠️ Technologies utilisées

| Outil / Tech        | Rôle                 |
| ------------------- | -------------------- |
| React Native (Expo) | Développement mobile |
| AsyncStorage        | Stockage local       |
| VS Code             | IDE principal        |
| Git & GitHub        | Versionnage          |

---

## 🧪 Installation

### 🔧 Prérequis

- Node.js
- npm
- Expo CLI (`npm install -g expo-cli`)
- Application Expo Go (pour tester sur mobile)

### 📦 Clonage du projet

```bash
git clone https://github.com/bastienpog/myNotes.git
cd myNotes
npm install
npm run start
```
