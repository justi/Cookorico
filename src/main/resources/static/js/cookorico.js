/**
 * Created by leemans on 03/11/15.
 */

window.app_version = 2;

angular
    .module('cookorico', [
        'ngRoute', 'auth', 'home',
        'ui.router', 'ngAnimate','message',
        'ui.bootstrap', 'textAngular',
        'ui.calendar', 'perfect_scrollbar',
        'angular-loading-bar', 'chart.js',
        'angular-growl', 'angulartics','navigation',
        'angulartics.google.analytics', 'gridshore.c3js.chart',
        'growlNotifications', 'angular.css.injector'
    ])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.latencyThreshold = 5;
        cfpLoadingBarProvider.includeSpinner = false;
    }])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $locationProvider.html5Mode(true);
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        $urlRouterProvider.when('/dashboard', '/dashboard/home');
        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
            .state('accueil', {
                url: '/',
                templateUrl: 'js/navigation/login.html',
                controller: 'navigation'
            })
            
            .state('plain', {
                abstract: true,
                url: '',
                templateUrl: 'views/layouts/plain.html?v=' + window.app_version,
            })
            .state('boxed', {
                abstract: true,
                url: '',
                parent: 'plain',
                templateUrl: 'views/layouts/boxed.html?v=' + window.app_version,
            })

            .state('login', {
                url: '/login',
                parent: 'boxed',
                templateUrl: 'views/pages/login.html?v=' + window.app_version,
                controller: 'LoginCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                parent: 'plain',
                templateUrl: 'views/layouts/dashboard.html?v=' + window.app_version,
                controller: 'DashboardCtrl'
            })
            .state('home', {
                url: '/home',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/home.html?v=' + window.app_version,
            })
            .state('profile', {
                url: '/profile',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/profile.html?v=' + window.app_version,
            })
            .state('grid', {
                url: '/grid',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/grid.html?v=' + window.app_version,
            })
            .state('elements', {
                url: '/form/elements',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/forms/elements.html?v=' + window.app_version,
            })
            .state('components', {
                url: '/form/components',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/forms/components.html?v=' + window.app_version,
            })
            .state('invoice', {
                url: '/invoice',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/invoice.html?v=' + window.app_version,
            })
            .state('inbox', {
                url: '/mail/inbox',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/mail/inbox.html?v=' + window.app_version,
            })
            .state('blank', {
                url: '/blank',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/blank.html?v=' + window.app_version,
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/pages/signup.html?v=' + window.app_version,
                parent: 'boxed',
                controller: 'LoginCtrl'
            })
            .state('forgot-password', {
                url: '/forgot-password',
                parent: 'boxed',
                templateUrl: 'views/pages/forgot-password.html?v=' + window.app_version,
                controller: 'LoginCtrl'
            })
            .state('404-page', {
                url: '/404-page',
                parent: 'boxed',
                templateUrl: 'views/pages/404-page.html?v=' + window.app_version,
                controller: 'LoginCtrl'
            })
            .state('timepicker', {
                url: '/ui-elements/timepicker',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/timepicker.html?v=' + window.app_version,
                controller: 'TimepickerDemoCtrl'
            })
            .state('button', {
                url: '/ui-elements/button',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/ui-elements/button.html?v=' + window.app_version,
                controller: 'ButtonsCtrl'
            })
            .state('c3chart', {
                url: '/charts/c3chart',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/charts/c3chart.html?v=' + window.app_version,
            })
            .state('chartjs', {
                url: '/charts/chartjs',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/charts/chartjs.html?v=' + window.app_version,
                controller: 'ChartCtrl'
            })
            .state('progression', {
                url: '/progression',
                parent: 'dashboard',
                templateUrl: 'views/pages/dashboard/maprogression.html?v=' + window.app_version,
                controller: 'maprogressionCtrl'
            })
            .state('taste', {
            	url: '/taste',
            	parent: 'dashboard',
            	templateUrl : 'js/taste/taste.html?v=' + window.app_version
            })
            .state('recipe', {
                url: '/recipe',
                parent: 'dashboard',
                templateUrl: 'js/recipe/recipe.html',
                controller: 'recipe'
            })
            .state('newrecipe', {
                url: '/newrecipe',
                parent: 'dashboard',
                templateUrl: 'js/recipe/newrecipe.html',
                controller: 'recipe'
            });
    })
    .run(function () {

        var switchValue = JSON.parse(localStorage.getItem("switched"));

        if (switchValue)
            $('body').addClass('box-section');

    });