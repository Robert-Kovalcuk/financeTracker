<template lang="pug">
.items-header
	//span sort by
	//.items-header-properties
		p(v-for="property in itemProperties" :key="property" @click="sortItems(property)").items-header-p {{ property }}
	p day
	p week
	p month
.item-list-wrapper
	.items-list
		.item-list-item(v-for="item in items.items" :key="item.name")
			.item-list-item-date-container
				p {{ item.created.toUTCString() }}
			.item-list-item-name-container
				p {{ item.name }}
			.item-list-item-price-container
				p {{ item.price }}
				p {{ item.category }}
</template>

<script lang="ts" setup>
import {EDefaultCategory} from "@/data/enums/eDefaultCategory"
import Item from "@/data/item"
import {computed, reactive} from "vue"

const itemProperties = computed(() => Object.getOwnPropertyNames(new Item("", 0, new Date(Date.now()), EDefaultCategory.FastFood)))
const items = reactive({
		items: [
			{
				name: "come name",
				price: 26.5,
				category: EDefaultCategory.Groceries,
				created: new Date(Date.now())
			},
			{
				name: "come name",
				price: 26.5,
				category: EDefaultCategory.Groceries,
				created: new Date(Date.now())
			},
			{
				name: "dame",
				price: 24.5,
				category: EDefaultCategory.FastFood,
				created: new Date(Date.now())
			},
			{
				name: "ame",
				price: 24.5,
				category: EDefaultCategory.FastFood,
				created: new Date(Date.now())
			},
			{
				name: "bame",
				price: 24.5,
				category: EDefaultCategory.FastFood,
				created: new Date(Date.now())
			},
			{
				name: "name",
				price: 24.5,
				category: EDefaultCategory.FastFood,
				created: new Date(Date.now())
			}
		]
	})
</script>
<style scoped>
.items-header {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.items-header > span {
	align-self: center;
}
.items-header-p {
	margin: 2px 6px;
}
.items-header-properties {
	display: flex;
	justify-content: center;
}
.item-list-wrapper {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: lightgrey;
}
.item-list-item {
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin: 12px 4px;
	background-color: grey;
}
.item-list-item:hover {
	background-color: darkgrey;
}
.item-list-item-date-container, .item-list-item-name-container {
	display: flex;
	justify-content: center;
}
.item-list-item-date-container, .item-list-item-price-container {
	flex-grow: 1;
}
.item-list-item-name-container {
	flex-basis: 50px;
	flex-grow: 2;
}
.item-list-item-price-container {
	display: flex;
	align-items: center;
	flex-direction: column;
}
</style>
