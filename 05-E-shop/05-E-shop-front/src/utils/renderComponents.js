// import Input from "../components/common/Input";
// import Select from "../components/common/Select";

// const renderInput = (inputData, setInputData,name, label, type = "text") => {

//     return (
//       <Input
//         name={name}
//         label={label}
//         type={type}
//         value={inputData[name]} // 如果data有值，就會顯示在頁面讓使用者知道多少值
//         // onChange={handleChange}
//         // error={errors[name]}
//       />
//     );
//   };

//   const renderSelect = (name, label, options) => {
//     const { data, errors } = this.state;

//     return (
//       <Select
//         name={name}
//         label={label}
//         options={options}
//         value={data[name]} // 顯示在頁面使用者看得到文字
//         onChange={this.handleChange}
//         error={errors[name]}
//       />
//     );
//   };

//   const renderButton = (label) => {
//     return (
//       <input
//         type="submit"
//         value={label}
//         className="btn btn-primary mt-4"
//         disabled={this.validate()} // 有值代表有error，為truthy，所以開啟disabled，取消submit功能
//       />
//     );
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const errors = this.validate();
//     this.setState({ errors: errors || {} }); // 為了讓username和password能夠參照沒有error的errors<
//     // -> 使用 || or選擇器，沒有errors，不要設null，而是{}狀態
//     if (errors) return; // 如果有errors，就停止函式繼續往下執行
//     this.doSubmit();
//   };

//   const handleChange = ({ target: input }) => {
//     // target = event.target
//     // const input = event.target
//     // 每次只要輸入框內的一個字元改變，就會setState一次，然後重新render()
//     const errors = { ...errors };
//     const errorMessage = this.validProperty(input);

//     if (errorMessage) errors[input.name] = errorMessage;
//     else delete errors[input.name]; // 如果沒有出現error，就刪掉errors狀態屬性，不然會一直出現

//     data[input.name] = input.value;

//     // setData(data)
//     // setErrors(errors)
//    // data被重設完值，再render一次，所輸入的值才會顯示到頁面上
//   };

//   const render = {
//     input: renderInput,
//     select: renderSelect,
//     button: renderButton
// }

// export default render;