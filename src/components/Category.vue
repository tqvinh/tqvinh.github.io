<template>
<div id="my-content">
    <h1 style="font-family:'Comic Sans MS'; font-size:3.5rem;padding-top:3rem;color:white;">Choose a category to play!</h1>
    <router-link v-for="(item,index) in mockCategory" :key="index" :to="item.link">
        <section class="cards">
            <article class="card">
                <div class="card__img" :style="{ 'background-image': 'url(' + item.imagePath + ')'}"></div>
                <div class="card__img--hover" :style="{ 'background-image': 'url(' + item.imagePath + ')'}"></div>
                <div class="card__info">
                    <h3 class="card__title" align="center">{{ item.name }}</h3>
                </div>
            </article>
        </section>
    </router-link>
</div>
</template>

<script>
export default {
    data() {
        return {
            mockCategory: [{
                    "id": "1",
                    "categoryId": 1,
                    "name": "My friends",
                    "imagePath": "src/assets/categories/myfriends.jpg",
                    "link": "/MainBoard/myfriends"
                },
                {
                    "id": "2",
                    "categoryId": 2,
                    "name": "Arena of Valor heroes",
                    "imagePath": "src/assets/categories/aov.jpg",
                    "link": "/MainBoard/aov"
                },
                {
                    "id": "3",
                    "categoryId": 3,
                    "name": "Doraemon characters",
                    "imagePath": "src/assets/categories/doraemon.jpg",
                    "link": "/MainBoard/doraemon"
                },
                {
                    "id": "4",
                    "categoryId": 4,
                    "name": "Dragonball characters",
                    "imagePath": "src/assets/categories/dragonball.jpg",
                    "link": "/MainBoard/dragonball"
                },
                {
                    "id": "5",
                    "categoryId": 5,
                    "name": "One punch man characters",
                    "imagePath": "src/assets/categories/onepunchman.jpg",
                    "link": "/MainBoard/onepunchman"
                },
                {
                    "id": "6",
                    "categoryId": 6,
                    "name": "Random",
                    "imagePath": "src/assets/categories/mix.png",
                    "link": "/MainBoard/random"
                }
            ]
        }
    }
}
</script>

<style>
@import '../styles/category.css';
@import '../styles/main.css';
@import 'https://fonts.googleapis.com/css2?family=Roboto&display=swap';
</style>
