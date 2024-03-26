import { SizesHeaderTableCell } from "components/product/components/SizesHeaderTableCell";
import { SizesTableBodyCell } from "components/product/components/SizesTableBodyCell";
import { Table, TableBody, TableHeader, TableRow } from "components/ui/Table";

export const SizesTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <SizesHeaderTableCell className="w-[100px]">Size</SizesHeaderTableCell>

        <SizesHeaderTableCell>XS</SizesHeaderTableCell>

        <SizesHeaderTableCell>S</SizesHeaderTableCell>

        <SizesHeaderTableCell>M</SizesHeaderTableCell>

        <SizesHeaderTableCell>L</SizesHeaderTableCell>

        <SizesHeaderTableCell>XL</SizesHeaderTableCell>

        <SizesHeaderTableCell>XXL</SizesHeaderTableCell>

        <SizesHeaderTableCell>XXXL</SizesHeaderTableCell>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow>
        <SizesTableBodyCell className="bg-[#74748014] font-normal">Shoulder</SizesTableBodyCell>

        <SizesTableBodyCell>41.5</SizesTableBodyCell>

        <SizesTableBodyCell>43</SizesTableBodyCell>

        <SizesTableBodyCell>44.5</SizesTableBodyCell>

        <SizesTableBodyCell>46</SizesTableBodyCell>

        <SizesTableBodyCell>48.5</SizesTableBodyCell>

        <SizesTableBodyCell>50</SizesTableBodyCell>

        <SizesTableBodyCell>51.5</SizesTableBodyCell>
      </TableRow>

      <TableRow>
        <SizesTableBodyCell className="bg-[#74748014] font-normal">Bust</SizesTableBodyCell>

        <SizesTableBodyCell>88</SizesTableBodyCell>

        <SizesTableBodyCell>92</SizesTableBodyCell>

        <SizesTableBodyCell>98</SizesTableBodyCell>

        <SizesTableBodyCell>104</SizesTableBodyCell>

        <SizesTableBodyCell>112</SizesTableBodyCell>

        <SizesTableBodyCell>122</SizesTableBodyCell>

        <SizesTableBodyCell>134</SizesTableBodyCell>
      </TableRow>

      <TableRow>
        <SizesTableBodyCell className="bg-[#74748014] font-normal">Waist</SizesTableBodyCell>

        <SizesTableBodyCell>73</SizesTableBodyCell>

        <SizesTableBodyCell>79</SizesTableBodyCell>

        <SizesTableBodyCell>85</SizesTableBodyCell>

        <SizesTableBodyCell>91</SizesTableBodyCell>

        <SizesTableBodyCell>106</SizesTableBodyCell>

        <SizesTableBodyCell>117</SizesTableBodyCell>

        <SizesTableBodyCell>129</SizesTableBodyCell>
      </TableRow>

      <TableRow>
        <SizesTableBodyCell className=" bg-[#74748014] font-normal">Hip</SizesTableBodyCell>

        <SizesTableBodyCell>88</SizesTableBodyCell>

        <SizesTableBodyCell>94</SizesTableBodyCell>

        <SizesTableBodyCell>100</SizesTableBodyCell>

        <SizesTableBodyCell>106</SizesTableBodyCell>

        <SizesTableBodyCell>114</SizesTableBodyCell>

        <SizesTableBodyCell>122</SizesTableBodyCell>

        <SizesTableBodyCell>134</SizesTableBodyCell>
      </TableRow>
    </TableBody>
  </Table>
);
