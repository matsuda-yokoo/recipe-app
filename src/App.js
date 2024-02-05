
import './App.css';
import React,{useEffect,useState} from 'react';
import Recipe from './Recipe.js';

function App() {

  //レシピAPIを指定する
  const APP_ID="99668374"
  const APP_KEY="7ac43dc75cd7b4e46d37b1fd4acddfc5"

  //useStateの初期値を設定
  const [search,setSearch]=useState("")
  const [query,setQuery]=useState("banana")
  const [recipes,setRecipes]=useState([])

  //レシピ情報をAPIから取得する
  //ヒットした情報を表示する
  //データ取得終わってから表示する
  const getRecipes = async ()=>{
    const response = await fetch(`https://api.edamam.com/search?q="${query}"&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  //onSubmitしたときに呼び出す関数。
  //onSubmitしたら普通のhtmlを呼び出してしまうため、preventDefaultする
  const getSearch = e=>{
    e.preventDefault();
    setQuery(search); //検索した文字列をapiに渡す
    setSearch("");  //検索欄を空欄に戻す
  };


  //インプットの中に書かれた文字が都度e.target.valueに入る→その値をsetSearchに代入
  const updateSearch=e=>{
    setSearch(e.target.value)
  };

  //queryを変更したときにレシピをAPIから取得して画面に表示する
  useEffect(()=>{
    getRecipes();
      },[query]
  );

  //{search}が変更されるごとにonChange呼び出し⇒updateSearch呼び出し⇒searchが更新される
  return (
    <div className="App">
      <form onSubmit={getSearch}>
        <input type="text" value={search} onChange={updateSearch}/>
        <button type="submit">検索</button>
      </form>
      <div>
        {recipes.map(recipe=>{
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        })}
      </div>
    </div>
  );
}

export default App;
