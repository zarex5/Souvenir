pragma solidity ^0.7.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract Souvenirs is ERC1155 {
    mapping(string => uint256) map;

    constructor() public ERC1155("https://raw.githubusercontent.com/zarex5/Souvenir/main/deploy/api/token/{id}.json") {
        map["PARIS"] = 0;
        map["LONDON"] = 1;
    }

    function mintToken(address owner, string memory city, uint256 amount)
    public
    returns (uint256)
    {
        _mint(owner, map[city], amount, "");
    }
}