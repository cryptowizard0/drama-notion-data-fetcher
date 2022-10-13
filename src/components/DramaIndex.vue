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
        async queryLocalServ(){
            console.log("queryData_Axios");

            const baseUrl = '/prox'
            const queryUrl = '/drama'
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
  