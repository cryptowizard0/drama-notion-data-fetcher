<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <p>
        Drama指数来了！
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="Title" label="Title" width="180" />
            <el-table-column prop="Score" label="Score" width="180" />
            <el-table-column prop="Date" label="Date" width="180" />
            <el-table-column prop="Describtion" label="Describtion" />
        </el-table>
      </p>
    </div>
  </template>
  
  <script>
  import axios from 'axios'

  export default {
    name: 'DramaIndex',
    props: {
      msg: String
    },
    data() {
        return {
            tableData: []
        }
    },
    mounted () {
        console.log("Page loaded");
        this.tableData =  [
                {
                    Date: '2016-05-03',
                    Title: 'Tom',
                    Describtion: 'No. 189, Grove St, Los Angeles',
                    Score: 100,
                },
                {
                    Date: '2016-05-02',
                    Title: 'Tom',
                    Describtion: 'No. 189, Grove St, Los Angeles',
                    Score: 18,
                },
            ]
        this.queryData2()
    },
    methods: {
        async queryData1(){
            // 'https://api.notion.com/v1/databases/8ea5ef86fe924012b22f202d870c9b5e/query'
            const baseUrl = "https://api.notion.com"
            // const baseUrl = 'http://localhost:8081/api'
            const queryUrl = '/v1/databases/8ea5ef86fe924012b22f202d870c9b5e/query'
            const allUrl = baseUrl + queryUrl

            var request = require('request');
            var options = {
                'method': 'POST',
                'url': allUrl,
                'headers': {
                    'Authorization': 'Bearer secret_ue9dm6o69bjmLiKT5OembZtssebsqZ3BkZCH4ow7J0k',
                    'Content-Type': 'application/json',
                    'Notion-Version': '2022-02-22'
                },
                body: JSON.stringify({
                    "filter": {
                    "property": "Score",
                    "number": {
                        "greater_than": 1
                    }
                    },
                    "sorts": [
                    {
                        "property": "Date",
                        "direction": "descending"
                    }
                    ]
                })
            };

            request(options, function (error, response) {
                if (error) throw new Error(error);
                console.log(response.body);
            });
        },
        async queryData2(){
            console.log("queryData2");
            var data = JSON.stringify({
                "filter": {
                    "property": "Score",
                    "number": {
                    "greater_than": 1
                    }
                },
                "sorts": [
                    {
                    "property": "Date",
                    "direction": "descending"
                    }
                ]
            });
            // const baseUrl = "https://api.notion.com"
            // const baseUrl = 'http://localhost:8081/api'
            const baseUrl = '/api'
            const queryUrl = '/v1/databases/8ea5ef86fe924012b22f202d870c9b5e/query'
            const allUrl = baseUrl + queryUrl
            var config = {
                method: 'post',
                url: allUrl,
                headers: { 
                    'Authorization': 'Bearer secret_ue9dm6o69bjmLiKT5OembZtssebsqZ3BkZCH4ow7J0k', 
                    'Content-Type': 'application/json', 
                    'Notion-Version': '2022-02-22'
                },
                data : data
            };

            axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
            // axios.post(allUrl, data)
            // .then(function(response) {
            //     console.log(JSON.stringify(response.data));
            // })
            // .catch(function(error) {
            //     console.log(error);
            // })
        }
    }
  }
  
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
  