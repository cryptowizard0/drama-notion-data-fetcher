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
  const { Client, APIErrorCode } = require("@notionhq/client")

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
        
        this.queryLocalServ()
    },
    methods: {
        async queryData_Org(){
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
        async queryData_Axios(){
            console.log("queryData_Axios");
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
            //const baseUrl = 'http://127.0.0.1:8080/prox'
            const baseUrl = '/prox'
            const queryUrl = '/v1/databases/9c3c747d981540799c2c17aaf3af15b7/query'
            //const queryUrl = '/zh/articledetails/ozdmdwl5.html'
            const allUrl =  baseUrl + queryUrl

            var config = {
                method: 'post',
                url: allUrl,
                headers: { 
                    'Authorization': 'Bearer secret_lVlC1fCK8kVPwlJqaTZJM3QUSNAygUTtYddPpcRsxac', 
                    'Content-Type': 'application/json', 
                    'Notion-Version': '2022-02-22',
                    'Access-Control-Allow-Origin': "*"
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
        },
        async queryData_Js(){
            console.log("queryData_Js");

            const notion = new Client({
                auth: 'secret_lVlC1fCK8kVPwlJqaTZJM3QUSNAygUTtYddPpcRsxac',
            })
            try{
                const myPage = await notion.databases.query({
                    database_id: "9c3c747d981540799c2c17aaf3af15b7",
                    filter: {
                        property: "Score",
                        number: {
                            greater_than: 1
                        }
                    },
                    sorts: [
                        {
                            property: "Date",
                            direction: "descending"
                        }
                    ]
                }) 

                console.log(JSON.stringify(myPage))
            }catch (error) {
                if (error.code === APIErrorCode.ObjectNotFound) {
                    //
                    // For example: handle by asking the user to select a different database
                    //
                    console.error(error)
                } else {
                    // Other error handling code
                    console.error(error)
                }
            }  
        },
        async queryLocalServ(){
            console.log("queryData_Axios");

            const baseUrl = '/prox'
            const queryUrl = '/home'
            const allUrl =  baseUrl + queryUrl
            var config = {
                method: 'get',
                url: allUrl,
            };

            axios(config)
            .then((response) => {
                this.tableData = []
                
                var itemlist = response.data.results
                for (let i = 0; i < itemlist.length; ++i) {
                    var item = itemlist[i]
                    var score = item.properties.Score.number
                    var title = item.properties.Title.title[0].text.content
                    var desc = item.properties.Describtion.rich_text[0].text.content
                    var date = item.properties.Date.date.start
                    this.tableData.push({
                        Date: date,
                        Title: title,
                        Describtion: desc,
                        Score: score,
                    })
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
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
  