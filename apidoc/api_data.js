define({ "api": [
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Request for login",
    "name": "login",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "return",
            "description": "<p>user with token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "return",
            "description": "<p>error response</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.route.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth/signUp",
    "title": "Request for logout",
    "name": "logout",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "return",
            "description": "<p>user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "return",
            "description": "<p>error response</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.route.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/signUp",
    "title": "Request for signup",
    "name": "signUp",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passwordConfirm",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "roleId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "return",
            "description": "<p>user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "return",
            "description": "<p>error response</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.route.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/discounts/",
    "title": "Request for create discount",
    "name": "create_discount",
    "group": "Discount",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>of menu or producline</p>"
          },
          {
            "group": "Parameter",
            "type": "float",
            "optional": false,
            "field": "price",
            "description": "<p>of discount</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Discount",
            "optional": false,
            "field": "return",
            "description": "<p>discount</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/discount.route.ts",
    "groupTitle": "Discount"
  },
  {
    "type": "delete",
    "url": "/discounts/:id",
    "title": "Request for delete discount",
    "name": "delete_discount",
    "group": "Discount",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/discount.route.ts",
    "groupTitle": "Discount"
  },
  {
    "type": "get",
    "url": "/discounts/",
    "title": "Request for get discounts",
    "name": "get_discounts",
    "group": "Discount",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Discount",
            "optional": false,
            "field": "return",
            "description": "<p>list of discount</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/discount.route.ts",
    "groupTitle": "Discount"
  },
  {
    "type": "put",
    "url": "/discounts/:id",
    "title": "Request for update discount",
    "name": "update_discount",
    "group": "Discount",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "float",
            "optional": false,
            "field": "price",
            "description": "<p>of discount</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Discount",
            "optional": false,
            "field": "return",
            "description": "<p>discount</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/discount.route.ts",
    "groupTitle": "Discount"
  },
  {
    "type": "delete",
    "url": "/forwards/:id",
    "title": "Request for delete forward",
    "name": "delete_forward",
    "group": "Forward",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/forward.route.ts",
    "groupTitle": "Forward"
  },
  {
    "type": "post",
    "url": "/forwards/",
    "title": "Request for create forward",
    "name": "create_forward",
    "group": "Forwards",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>of menu or producline</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>of forward</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Forwards",
            "optional": false,
            "field": "return",
            "description": "<p>forward</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/forward.route.ts",
    "groupTitle": "Forwards"
  },
  {
    "type": "get",
    "url": "/forwards/",
    "title": "Request for get forwards",
    "name": "get_forwards",
    "group": "Forwards",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Forwards",
            "optional": false,
            "field": "return",
            "description": "<p>list of forward</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/forward.route.ts",
    "groupTitle": "Forwards"
  },
  {
    "type": "put",
    "url": "/forwards/:id",
    "title": "Request for update forward",
    "name": "update_forward",
    "group": "Forward",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "float",
            "optional": false,
            "field": "price",
            "description": "<p>of forward</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Forward",
            "optional": false,
            "field": "return",
            "description": "<p>forward</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/forward.route.ts",
    "groupTitle": "Forward"
  },
  {
    "type": "post",
    "url": "/ingredients/",
    "title": "Request for create ingerdient",
    "name": "create_ingredient",
    "group": "Ingredients",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>of ingredients</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Ingredient",
            "optional": false,
            "field": "return",
            "description": "<p>ingredient</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/ingredient.route.ts",
    "groupTitle": "Ingredients"
  },
  {
    "type": "delete",
    "url": "/ingredients/:id",
    "title": "Request for delete ingredients",
    "name": "delete_ingredients",
    "group": "Ingredients",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/ingredient.route.ts",
    "groupTitle": "Ingredients"
  },
  {
    "type": "delete",
    "url": "/ingredients/:id",
    "title": "Request for delete ingredients",
    "name": "delete_ingredients",
    "group": "Ingredients",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/menu.route.ts",
    "groupTitle": "Ingredients"
  },
  {
    "type": "get",
    "url": "/ingredients/",
    "title": "Request for get ingredients",
    "name": "get_ingredients",
    "group": "Ingredients",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Ingredients",
            "optional": false,
            "field": "return",
            "description": "<p>list of Ingredients</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/ingredient.route.ts",
    "groupTitle": "Ingredients"
  },
  {
    "type": "put",
    "url": "/ingredients/:id",
    "title": "Request for update ingredients",
    "name": "update_ingredients",
    "group": "Ingredients",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>of ingredients</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Ingredient",
            "optional": false,
            "field": "return",
            "description": "<p>ingredient</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/ingredient.route.ts",
    "groupTitle": "Ingredients"
  },
  {
    "type": "post",
    "url": "/Menus/",
    "title": "Request for create menu",
    "name": "create_menu",
    "group": "Menus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>of menu</p>"
          },
          {
            "group": "Parameter",
            "type": "float",
            "optional": false,
            "field": "price",
            "description": "<p>of menu</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "orderable",
            "description": "<p>menu</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Menu",
            "optional": false,
            "field": "return",
            "description": "<p>menu</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/menu.route.ts",
    "groupTitle": "Menus"
  },
  {
    "type": "delete",
    "url": "/menus/:id",
    "title": "Request for delete menus",
    "name": "delete_menus",
    "group": "Menus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/menu.route.ts",
    "groupTitle": "Menus"
  },
  {
    "name": "get_ingredients",
    "group": "Menus",
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Menus",
            "optional": false,
            "field": "return",
            "description": "<p>Menu by id param</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "src/routes/menu.route.ts",
    "groupTitle": "Menus"
  },
  {
    "type": "get",
    "url": "/menus/",
    "title": "Request for get menus",
    "name": "get_menus",
    "group": "Menus",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Menus",
            "optional": false,
            "field": "return",
            "description": "<p>list of Menus</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/menu.route.ts",
    "groupTitle": "Menus"
  },
  {
    "type": "put",
    "url": "/menus/:id",
    "title": "Request for update menus",
    "name": "update_menu",
    "group": "Menus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>of menu</p>"
          },
          {
            "group": "Parameter",
            "type": "float",
            "optional": false,
            "field": "price",
            "description": "<p>of menu</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "orderable",
            "description": "<p>menu</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Ingredient",
            "optional": false,
            "field": "return",
            "description": "<p>ingredient</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/menu.route.ts",
    "groupTitle": "Menus"
  },
  {
    "type": "post",
    "url": "/orders/",
    "title": "Request for create order",
    "name": "create_order",
    "group": "Orders",
    "parameter": {
      "examples": [
        {
          "title": "{",
          "content": "{\n\"menuIds\":[\n   {\n      \"menuId\":1,\n      \"xl\":false,\n      \"productLine\":[\n         {\n            \"productLineId\":1,\n            \"ingredienttoremove\":[\n               3\n            ]\n         }\n      ]\n   },\n   {\n      \"menuId\":1,\n      \"xl\":true\n   }\n],\n\"productLineIds\":[",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Ingredient",
            "optional": false,
            "field": "return",
            "description": "<p>ingredient</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/order.route.ts",
    "groupTitle": "Orders"
  },
  {
    "type": "put",
    "url": "/orders/:orderId",
    "title": "Request for update orders",
    "name": "update_order",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>order picker &amp; admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role order picker & admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "orders",
            "optional": false,
            "field": "return",
            "description": "<p>order</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/order.route.ts",
    "groupTitle": "Orders"
  },
  {
    "type": "get",
    "url": "/orders/",
    "title": "Request for get orders",
    "name": "get_orders",
    "group": "Ordres",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role any"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Recipes",
            "optional": false,
            "field": "return",
            "description": "<p>list of orders of user logged</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/order.route.ts",
    "groupTitle": "Ordres"
  },
  {
    "type": "post",
    "url": "/lines/",
    "title": "Request for create productLines",
    "name": "create_productLine",
    "group": "ProductLine",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "desc_size",
            "description": "<p>productLine</p>"
          },
          {
            "group": "Parameter",
            "type": "float",
            "optional": false,
            "field": "price",
            "description": "<p>of productLine</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "productId",
            "description": "<p>of product</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "orderable",
            "description": "<p>of productLine</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ProductLine",
            "optional": false,
            "field": "return",
            "description": "<p>ProductLine</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/productLine.route.ts",
    "groupTitle": "ProductLine"
  },
  {
    "type": "delete",
    "url": "/lines/:id",
    "title": "Request for delete productLines",
    "name": "delete_productLines",
    "group": "ProductLines",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/productLine.route.ts",
    "groupTitle": "ProductLines"
  },
  {
    "type": "put",
    "url": "/lines/:id",
    "title": "Request for update productLines",
    "name": "update_productLines",
    "group": "ProductLines",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "desc_size",
            "description": "<p>productLine</p>"
          },
          {
            "group": "Parameter",
            "type": "float",
            "optional": false,
            "field": "price",
            "description": "<p>of productLine</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "productId",
            "description": "<p>of product</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "orderable",
            "description": "<p>of productLine</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ProductLine",
            "optional": false,
            "field": "return",
            "description": "<p>ProductLine</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/productLine.route.ts",
    "groupTitle": "ProductLines"
  },
  {
    "type": "delete",
    "url": "/types/:id",
    "title": "Request for delete ProductType",
    "name": "delete_ProductTyp",
    "group": "ProductType",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "unautorised",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/types.route.ts",
    "groupTitle": "ProductType"
  },
  {
    "type": "post",
    "url": "/types/",
    "title": "Request for create ProductType",
    "name": "create_ProductType",
    "group": "ProductTypes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "label",
            "description": "<p>of ProductType</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ProductType",
            "optional": false,
            "field": "return",
            "description": "<p>ProductType</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/types.route.ts",
    "groupTitle": "ProductTypes"
  },
  {
    "type": "get",
    "url": "/types/",
    "title": "Request for get product types",
    "name": "get_types",
    "group": "ProductTypes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ProductTypes",
            "optional": false,
            "field": "return",
            "description": "<p>list of ProductTypes</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/types.route.ts",
    "groupTitle": "ProductTypes"
  },
  {
    "type": "put",
    "url": "/types/:id",
    "title": "Request for update ProductTypes",
    "name": "update_ProductType",
    "group": "ProductTypes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "label",
            "description": "<p>of ProductType</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ProductType",
            "optional": false,
            "field": "return",
            "description": "<p>ProductType</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/types.route.ts",
    "groupTitle": "ProductTypes"
  },
  {
    "type": "post",
    "url": "/products/",
    "title": "Request for create product",
    "name": "create_product",
    "group": "Products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>of ref type</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>of product</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Product",
            "optional": false,
            "field": "return",
            "description": "<p>product</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/product.route.ts",
    "groupTitle": "Products"
  },
  {
    "type": "delete",
    "url": "/products/:id",
    "title": "Request for delete product",
    "name": "delete_product",
    "group": "Products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/product.route.ts",
    "groupTitle": "Products"
  },
  {
    "type": "put",
    "url": "/products/:id",
    "title": "Request for update product",
    "name": "update_product",
    "group": "Products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>of ref type</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>of product</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Ingredient",
            "optional": false,
            "field": "return",
            "description": "<p>ingredient</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/product.route.ts",
    "groupTitle": "Products"
  },
  {
    "type": "post",
    "url": "/ingredients/",
    "title": "Request for create line  recipe",
    "name": "create_recipe_line",
    "group": "Recipes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "quantity",
            "description": "<p>of recipe</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "removable",
            "description": "<p>of recipe</p>"
          },
          {
            "group": "Parameter",
            "type": "unitId",
            "optional": false,
            "field": "id",
            "description": "<p>of Unit</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Recipe",
            "optional": false,
            "field": "return",
            "description": "<p>Recipe</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/recipe.route.ts",
    "groupTitle": "Recipes"
  },
  {
    "type": "delete",
    "url": "/recipes/:id",
    "title": "Request for delete recipe",
    "name": "delete_recipe",
    "group": "Recipes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/recipe.route.ts",
    "groupTitle": "Recipes"
  },
  {
    "type": "get",
    "url": "/recipes/:productlineId",
    "title": "Request for get recipes by productline id",
    "name": "get_recipes",
    "group": "Recipes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Recipes",
            "optional": false,
            "field": "return",
            "description": "<p>list of Recipes</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/recipe.route.ts",
    "groupTitle": "Recipes"
  },
  {
    "type": "put",
    "url": "/recipes/:id",
    "title": "Request for update recipe",
    "name": "update_recipe",
    "group": "Recipes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "quantity",
            "description": "<p>of recipe</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "removable",
            "description": "<p>of recipe</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Recipe",
            "optional": false,
            "field": "return",
            "description": "<p>Recipe</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/recipe.route.ts",
    "groupTitle": "Recipes"
  },
  {
    "type": "post",
    "url": "/units/",
    "title": "Request for create Unit",
    "name": "create_Unit",
    "group": "Units",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>of Unit</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Units",
            "optional": false,
            "field": "return",
            "description": "<p>Unit</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/unit.route.ts",
    "groupTitle": "Units"
  },
  {
    "type": "delete",
    "url": "/units/:id",
    "title": "Request for delete unit",
    "name": "delete_unit",
    "group": "Units",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/unit.route.ts",
    "groupTitle": "Units"
  },
  {
    "type": "get",
    "url": "/units/",
    "title": "Request for get units",
    "name": "get_units",
    "group": "Units",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Units",
            "optional": false,
            "field": "return",
            "description": "<p>list of Units</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/unit.route.ts",
    "groupTitle": "Units"
  },
  {
    "type": "put",
    "url": "/units/:id",
    "title": "Request for update Unit",
    "name": "update_Unit",
    "group": "Units",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>of unit</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Unit",
            "optional": false,
            "field": "return",
            "description": "<p>unit</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/unit.route.ts",
    "groupTitle": "Units"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Request for delete user",
    "name": "delete_user",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/user.route.ts",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Request for get user",
    "name": "get_user",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "return",
            "description": "<p>one user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/user.route.ts",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:role",
    "title": "Request for get users by role",
    "name": "get_users",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "return",
            "description": "<p>list of  user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/user.route.ts",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Request for update user",
    "name": "update_User",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>admin</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "role admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstname",
            "description": "<p>of user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastname",
            "description": "<p>of user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>of user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "return",
            "description": "<p>user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "unauthorize",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/user.route.ts",
    "groupTitle": "Users"
  }
] });
