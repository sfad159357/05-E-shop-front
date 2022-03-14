import { createContext, useState } from "react";

const ProductsContext = createContext({
    products: [],
    itemCount: 0,
 
}) // 創造出一個物件，用來管理state

// 此函式用來更新state
// 在<ProductsContext.Provider>包起來的元件，代表這些元件是參與有關Products state的處理
// 此函式其實就是react元件，也就是當有state更新，此元件就會被響應，接下來就會透過上方的context
// 將state透過props的方式，傳遞到被Provider包裹裡各個子元件，讓子元件接收新的props，重新渲染
export function ProductsContextProvider(props) {
    
    const [userProducts, setUserProducts] = useState([])

    // 這裡傳入meetup物件，使userFavoriteMeetup => [{obj1}, {obj2}, ...]
    function addFavoriteHandler(favoriteMeetup) {

        // setUserProducts(userProducts.concat(favoriteMeetup))
        // 這個方法不建議使用，setXXXState不會立即進行更新，而是會進行排程
        // 當使用者很快速觸發2次以上addFavoriteHandler，導致favoriteMeetup可能還不是最新的state

        // 下面此方法將會確保我們要更新的state是最新的state
        // 建議在setXXXState()中設置一個callback func，參數就是最新的state
        setUserProducts((prevUserProducts) => {
            return prevUserProducts.concat(favoriteMeetup)
        })
    }

    function removeFavoriteHandler(meetupId) {
        setUserProducts((prevUserProducts) => {
            return prevUserProducts.filter(userFavorite => userFavorite.id !== meetupId)
        })
    }


    // 確認我們要查找的聚會id是否有在喜愛清單當中
    function ItemsIsFavoriteHandler(meetupId){
        // some()確認只要其中一個item在array當中，就是true，不然為false
        return userProducts.some( userFavorite => userFavorite.id === meetupId)
    }


    // 透過context能夠讓不同元件可以存取不同的屬性，以及不同的方法 
    const context = {
        products: userProducts,
        totalProducts: userProducts.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: ItemsIsFavoriteHandler
    }

    return (
        <ProductsContext.Provider value={context}>
            {props.children}
        </ProductsContext.Provider>
    )
    
}

export default ProductsContext;
