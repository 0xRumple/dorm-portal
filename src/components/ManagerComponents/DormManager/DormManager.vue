<template>
<div id="manager">
  <!-- filters sidebar -->
  <v-navigation-drawer width="220" touchless :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawerControl" fixed app>
    <v-list dense>
        <v-list-tile v-for="(menu,index) in drawerMenu" :key="index" @click="loadComponent(menu.componentName)">
          <v-list-tile-content>
            <v-list-tile-title>
            <v-icon class="menu-icon">{{menu.icon}}</v-icon>
              {{lang.managerMenuItems[index]}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-content>
    <v-container fluid class="mb-5">
      <v-layout row wrap>
        <v-flex xs12>
          <keep-alive>
            <component :is="currentTabComponent"></component>
          </keep-alive>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</div>
</template>

<script src="./DormManager.js"></script>

<style src="./DormManager.scss" lang="scss"></style>
