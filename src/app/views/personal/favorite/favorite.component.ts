import {Component, Input, OnInit} from '@angular/core';
import {FavoriteService} from "../../../shared/services/favorite.service";
import {FavoriteType} from "../../../../types/favorite.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {environment} from "../../../../environments/environment";
import {CartType} from "../../../../types/cart.type";
import {CartService} from "../../../shared/services/cart.service";
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {ActivatedRoute} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  products: FavoriteType[] = [];
  items!: CartType;
  count: number = 1;
  favoriteProdId!: string;
  // prod: boolean = false
  serverStaticPath = environment.serverStaticPath;

  @Input() countInCart: number | undefined = 0;

  constructor(private favoriteService: FavoriteService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    if (this.countInCart && this.countInCart > 1) {
      this.count = this.countInCart;
    }
    this.favoriteService.getFavorites()
      .subscribe((data: FavoriteType[] | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          const error = (data as DefaultResponseType).message;
          throw new Error(error);
        }

        this.products = data as FavoriteType[];
        this.products.find(() => {
          this.cartService.getCart()
            .subscribe((item) => {
              this.items = item as CartType

              if (this.items && this.items.items.length > 0) {
                this.products = this.products.map(product => {
                  if (this.items) {
                    const productInCart = this.items.items.find(item => item.product.id === product.id)
                    if (productInCart) {

                      product.prodInCart = productInCart.quantity
                      this.favoriteProdId = (product as FavoriteType).id
                    }
                  }
                  return product;
                });
              } else {
                this.products = data as FavoriteType[];

              }
            })
        });
      })
  }

  removeFromFavorite(id: string) {
    this.favoriteService.removeFavorites(id)
      .subscribe((data: DefaultResponseType) => {
        if (data.error) {
          throw new Error(data.message)
        }
        this.products = this.products.filter(item => item.id !== id);
        //Для удаления из массива
      })
  }

  addToCart(value: string) {
    this.cartService.updateCart(value, this.count)
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message)
        }
        const itemProd = this.products.find(item => item.id === value)
          if(itemProd){
            itemProd.prodInCart = this.count
        }
      })


  }

  removeFromCart(value: string) {
    this.cartService.updateCart(value, 0)
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message)
        }
        const itemProd = this.products.find(item => item.id === value)
        if(itemProd){
          itemProd.prodInCart = 0
        }
        // this.items = data as CartType;
      })

  }

  updateCount(value: number, id: string) {
    this.count = value;
    if (this.count) {
      this.cartService.updateCart(id, this.count)

        .subscribe((data: CartType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message)
          }
          this.countInCart = this.count;

        });
    }
  }
}
