import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { omit } from '../../helpers';

import Button from '../button';
import Icon from '../icon';

import styles from './button-upload.styl';

class ButtonUpload extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: props.files || [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.onDragover = this.onDragover.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.dropArea = React.createRef();
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    btnText: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    limit: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    files: PropTypes.array,
    formatWhiteList: PropTypes.array,
    accept: PropTypes.string,
    maxFileSize: PropTypes.number, // bytes
    allowedDimensions: PropTypes.array,
  };

  static defaultProps = {
    btnText: 'Upload',
    disabled: false,
    limit: false,
    files: [],
    loading: false,
    formatWhiteList: ['.png', '.jpg', '.jpeg', '.pdf'],
    maxFileSize: 3000000, // 3MB
    allowedDimensions: [],
  };

  componentDidMount() {
    this.dropArea.current.addEventListener('dragover', this.onDragover);
    this.dropArea.current.addEventListener('drop', this.onDrop);
  }

  componentDidUpdate(prevProps) {
    const { files } = this.props;
    if (prevProps.files.length > files.length) {
      this.setState({ list: files });
    }
  }

  componentWillUnmount() {
    this.dropArea.current.removeEventListener('dragover', this.onDragover);
    this.dropArea.current.removeEventListener('drop', this.onDrop);
  }

  onDragover(event) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }

  onDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    const { files } = event.dataTransfer;
    this.handleChange(files);
  }

  onLoadPromise(obj) {
    return new Promise((resolve, reject) => {
      obj.onload = () => resolve(obj);
      obj.onerror = reject;
    });
  }

  async convertToBase64(file) {
    const reader = new FileReader();
    const promissifiedReader = this.onLoadPromise(reader);

    reader.readAsDataURL(file);
    const { result } = await promissifiedReader;

    return result;
  }

  async getImageSize(src) {
    const img = new Image();
    const promissifiedImg = this.onLoadPromise(img);
    img.src = src;

    const { width, height } = await promissifiedImg;
    const dimension = `${width}x${height}`;

    return dimension;
  }

  async returnData(error) {
    const { allowedDimensions, onChange } = this.props;

    const filePromises = this.state.list.map(file => this.convertToBase64(file));
    const data = await Promise.all(filePromises);

    const sizePromises = data.map(base64 => this.getImageSize(base64));
    const sizeData = allowedDimensions.length ? await Promise.all(sizePromises) : [];

    onChange(data, this.state.list, error, sizeData);
  }

  async fileValidation(file) {
    const { formatWhiteList, maxFileSize, allowedDimensions } = this.props;
    const extension = file.name.split('.').pop();
    const base64 = await this.convertToBase64(file);
    const sizeData = allowedDimensions.length ? await this.getImageSize(base64) : null;

    const validation = {
      validFormat: formatWhiteList.includes(`.${extension}`),
      validSize: file.size <= maxFileSize,
      hasNoRepeat: !this.state.list.filter(currentFile => currentFile.name === file.name).length,
      allowedSize: allowedDimensions.length ? allowedDimensions.includes(sizeData) : true,
    };

    return {
      ...validation,
      valid: validation.validFormat && validation.validSize && validation.hasNoRepeat && validation.allowedSize,
    };
  }

  async handleChange(files) {
    let fileArr = [...files];
    let fileError = {};

    if (this.props.limit) {
      const spaceLeft = this.props.limit - this.state.list.length;
      fileArr = fileArr.splice(0, spaceLeft);
    }

    const validationFilesPromisse = fileArr.map(file => this.fileValidation(file));
    const validationList = await Promise.all(validationFilesPromisse);

    fileArr = fileArr.filter((file, idx) => {
      const { valid, validFormat, validSize, allowedSize } = validationList[idx];

      const err = !valid ? { [file.name]: [] } : {};
      !validFormat && err[file.name].push('invalid format');
      !validSize && err[file.name].push('too big');
      !allowedSize && err[file.name].push('wrong file dimension');

      fileError = {
        ...fileError,
        ...err,
      };

      return valid;
    });

    this.setState({ list: [...this.state.list, ...fileArr] }, () => {
      this.returnData(fileError);
    });
  }

  removeImage(index) {
    const list = this.state.list.filter((_, i) => i !== index);
    return () => {
      this.setState({ list }, () => {
        this.returnData();
      });
    };
  }

  renderTags() {
    return this.state.list.map((el, index) => (
      <div key={el.name} className={styles.tags}>
        {el.name}
        <Icon onClick={this.removeImage(index)} size="20" name="close" />
      </div>
    ));
  }

  render() {
    const { disabled, btnText, limit, showTags, loading, accept, formatWhiteList, as, className, ...rest } = this.props;
    const hasMaxFiles = this.state.list.length === limit;
    const WrapComponent = as || Button;

    return (
      <div className={className}>
        <div ref={this.dropArea} className={styles.dropArea}>
          <Icon size={60} name="backup" className={styles.iconDrop} />
          <p className={styles.textDropArea}>
            Arraste uma imagem para upload ou <br /> clique no botão abaixo
          </p>
          <WrapComponent
            loading={loading}
            disabled={disabled || hasMaxFiles}
            iconLeft="publish"
            className={styles.wrapcomp}
            {...omit(rest, ['onChange', 'maxFileSize', 'allowedDimensions', 'formatWhiteList'])}
          >
            {btnText}
            <input
              className={styles.file}
              type="file"
              onChange={e => this.handleChange(e.target.files)}
              disabled={disabled || hasMaxFiles}
              multiple
              accept={accept || formatWhiteList.join(', ')}
              key={this.state.list.length}
            />
          </WrapComponent>
        </div>
        {showTags && <div className={styles.holdTags}>{this.renderTags()}</div>}
      </div>
    );
  }
}

export default ButtonUpload;
