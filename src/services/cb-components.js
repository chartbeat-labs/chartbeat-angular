'use strict';

angular.module('cb.services.cbComponents', [
]).provider('cbComponents',
  [
  function() {

    // Default options
    var options = {
      templateBasePath: '',
      includeComponentFolder: true
    };

    /**
     * Set default options for all components
     * @param {Object} defaults
     */
    this.setDefaults = function(defaults) {
      angular.forEach(defaults, function(val, key) {
        options[key] = val;
      });
    };

    this.$get = function() {

      function CBComponents(options) {
        this.options = options;

        /**
         * Constructs path to the template url.
         * It takes prevoiously configured options for components
         * into account when creating the url.
         * @param  {String} templateName Template name, including extension (i.e. .html)
         * @return {String}              Full path to template.
         */
        this.getTemplateUrl = function(templateName) {
          var templateUrl = '';

          if (options.templateBasePath) {
            templateUrl += options.templateBasePath;
          }

          if (options.includeComponentFolder === true) {
            templateUrl +=  templateName.replace('.html', '/');
          }

          templateUrl += templateName;

          return templateUrl;
        };
      }

      return new CBComponents(options);

    };
  }
]);