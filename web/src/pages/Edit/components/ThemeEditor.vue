<template>
  <Sidebar ref="sidebar" :title="$t('theme.editorTitle')">
    <div class="themeEditor" :class="{ isDark: isDark }">
      <div class="toolbar">
        <el-button size="mini" type="primary" @click="exportTheme">
          <i class="iconfont icondaochu"></i>
          {{ $t('theme.exportTheme') }}
        </el-button>
        <el-button size="mini" type="success" @click="triggerImport">
          <i class="iconfont icondaoru"></i>
          {{ $t('theme.importTheme') }}
        </el-button>
        <el-button size="mini" @click="resetTheme">
          <i class="iconfont iconzhongzhi"></i>
          {{ $t('theme.resetTheme') }}
        </el-button>
        <input type="file" ref="importInput" accept=".json" style="display: none" @change="handleImport" />
      </div>

      <el-tabs v-model="activeTab" class="editorTabs">
        <el-tab-pane :label="$t('theme.background')" name="background">
          <div class="sectionContent">
            <div class="formRow">
              <span class="label">{{ $t('theme.backgroundColor') }}</span>
              <span class="colorBlock" v-popover:bgColorPopover :style="{ backgroundColor: themeConfig.backgroundColor }"></span>
              <el-popover ref="bgColorPopover" placement="bottom" trigger="click">
                <Color :color="themeConfig.backgroundColor" @change="(val) => updateConfig('backgroundColor', val)"></Color>
              </el-popover>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.backgroundRepeat') }}</span>
              <el-select size="mini" style="width: 120px" v-model="themeConfig.backgroundRepeat" @change="(val) => updateConfig('backgroundRepeat', val)">
                <el-option v-for="item in backgroundRepeatList" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.backgroundPosition') }}</span>
              <el-select size="mini" style="width: 120px" v-model="themeConfig.backgroundPosition" @change="(val) => updateConfig('backgroundPosition', val)">
                <el-option v-for="item in backgroundPositionList" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.backgroundSize') }}</span>
              <el-select size="mini" style="width: 120px" v-model="themeConfig.backgroundSize" @change="(val) => updateConfig('backgroundSize', val)">
                <el-option v-for="item in backgroundSizeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('theme.line')" name="line">
          <div class="sectionContent">
            <div class="formRow">
              <span class="label">{{ $t('theme.lineColor') }}</span>
              <span class="colorBlock" v-popover:lineColorPopover :style="{ backgroundColor: themeConfig.lineColor }"></span>
              <el-popover ref="lineColorPopover" placement="bottom" trigger="click">
                <Color :color="themeConfig.lineColor" @change="(val) => updateConfig('lineColor', val)"></Color>
              </el-popover>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.lineWidth') }}</span>
              <el-select size="mini" style="width: 80px" v-model="themeConfig.lineWidth" @change="(val) => updateConfig('lineWidth', val)">
                <el-option v-for="item in lineWidthList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.lineStyle') }}</span>
              <el-select size="mini" style="width: 100px" v-model="themeConfig.lineStyle" @change="(val) => updateConfig('lineStyle', val)">
                <el-option v-for="item in lineStyleList" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.lineDasharray') }}</span>
              <el-select size="mini" style="width: 100px" v-model="themeConfig.lineDasharray" @change="(val) => updateConfig('lineDasharray', val)">
                <el-option v-for="item in borderDasharrayList" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.lineRadius') }}</span>
              <el-select size="mini" style="width: 80px" v-model="themeConfig.lineRadius" @change="(val) => updateConfig('lineRadius', val)">
                <el-option v-for="item in borderRadiusList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.showLineMarker') }}</span>
              <el-switch v-model="themeConfig.showLineMarker" @change="(val) => updateConfig('showLineMarker', val)"></el-switch>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.lineFlow') }}</span>
              <el-switch v-model="themeConfig.lineFlow" @change="(val) => updateConfig('lineFlow', val)"></el-switch>
            </div>
            <div class="formRow" v-if="themeConfig.lineFlow">
              <span class="label">{{ $t('theme.lineFlowDuration') }}</span>
              <el-input-number size="mini" :min="0.1" :max="10" :step="0.1" v-model="themeConfig.lineFlowDuration" @change="(val) => updateConfig('lineFlowDuration', val)"></el-input-number>
            </div>
            <div class="formRow" v-if="themeConfig.lineFlow">
              <span class="label">{{ $t('theme.lineFlowForward') }}</span>
              <el-radio-group size="mini" v-model="themeConfig.lineFlowForward" @change="(val) => updateConfig('lineFlowForward', val)">
                <el-radio-button :value="true">{{ $t('theme.forward') }}</el-radio-button>
                <el-radio-button :value="false">{{ $t('theme.reverse') }}</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('theme.node')" name="node">
          <div class="sectionContent">
            <el-tabs v-model="nodeTab" type="card">
              <el-tab-pane :label="$t('theme.rootNode')" name="root">
                <NodeStyleEditor :node-style="themeConfig.root" @update="updateNodeStyle('root', $event)"></NodeStyleEditor>
              </el-tab-pane>
              <el-tab-pane :label="$t('theme.secondNode')" name="second">
                <NodeStyleEditor :node-style="themeConfig.second" @update="updateNodeStyle('second', $event)"></NodeStyleEditor>
              </el-tab-pane>
              <el-tab-pane :label="$t('theme.generalNode')" name="node">
                <NodeStyleEditor :node-style="themeConfig.node" @update="updateNodeStyle('node', $event)"></NodeStyleEditor>
              </el-tab-pane>
              <el-tab-pane :label="$t('theme.generalizationNode')" name="generalization">
                <NodeStyleEditor :node-style="themeConfig.generalization" @update="updateNodeStyle('generalization', $event)"></NodeStyleEditor>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('theme.associativeLine')" name="associative">
          <div class="sectionContent">
            <div class="formRow">
              <span class="label">{{ $t('theme.associativeLineWidth') }}</span>
              <el-select size="mini" style="width: 80px" v-model="themeConfig.associativeLineWidth" @change="(val) => updateConfig('associativeLineWidth', val)">
                <el-option v-for="item in lineWidthList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.associativeLineColor') }}</span>
              <span class="colorBlock" v-popover:assocLineColorPopover :style="{ backgroundColor: themeConfig.associativeLineColor }"></span>
              <el-popover ref="assocLineColorPopover" placement="bottom" trigger="click">
                <Color :color="themeConfig.associativeLineColor" @change="(val) => updateConfig('associativeLineColor', val)"></Color>
              </el-popover>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.associativeLineActiveWidth') }}</span>
              <el-select size="mini" style="width: 80px" v-model="themeConfig.associativeLineActiveWidth" @change="(val) => updateConfig('associativeLineActiveWidth', val)">
                <el-option v-for="item in lineWidthList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.associativeLineActiveColor') }}</span>
              <span class="colorBlock" v-popover:assocActiveColorPopover :style="{ backgroundColor: themeConfig.associativeLineActiveColor }"></span>
              <el-popover ref="assocActiveColorPopover" placement="bottom" trigger="click">
                <Color :color="themeConfig.associativeLineActiveColor" @change="(val) => updateConfig('associativeLineActiveColor', val)"></Color>
              </el-popover>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.associativeLineStyle') }}</span>
              <el-select size="mini" style="width: 100px" v-model="themeConfig.associativeLineDasharray" @change="(val) => updateConfig('associativeLineDasharray', val)">
                <el-option v-for="item in borderDasharrayList" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.associativeLineTextColor') }}</span>
              <span class="colorBlock" v-popover:assocTextColorPopover :style="{ backgroundColor: themeConfig.associativeLineTextColor }"></span>
              <el-popover ref="assocTextColorPopover" placement="bottom" trigger="click">
                <Color :color="themeConfig.associativeLineTextColor" @change="(val) => updateConfig('associativeLineTextColor', val)"></Color>
              </el-popover>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.associativeLineTextFontSize') }}</span>
              <el-select size="mini" style="width: 80px" v-model="themeConfig.associativeLineTextFontSize" @change="(val) => updateConfig('associativeLineTextFontSize', val)">
                <el-option v-for="item in fontSizeList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('theme.generalizationLine')" name="generalizationLine">
          <div class="sectionContent">
            <div class="formRow">
              <span class="label">{{ $t('theme.generalizationLineWidth') }}</span>
              <el-select size="mini" style="width: 80px" v-model="themeConfig.generalizationLineWidth" @change="(val) => updateConfig('generalizationLineWidth', val)">
                <el-option v-for="item in lineWidthList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
            <div class="formRow">
              <span class="label">{{ $t('theme.generalizationLineColor') }}</span>
              <span class="colorBlock" v-popover:genLineColorPopover :style="{ backgroundColor: themeConfig.generalizationLineColor }"></span>
              <el-popover ref="genLineColorPopover" placement="bottom" trigger="click">
                <Color :color="themeConfig.generalizationLineColor" @change="(val) => updateConfig('generalizationLineColor', val)"></Color>
              </el-popover>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('theme.themeMarket')" name="market">
          <div class="themeMarket">
            <div class="marketItem" v-for="theme in customThemes" :key="theme.value" @click="applyCustomTheme(theme)">
              <div class="themePreview" :style="getPreviewStyle(theme.value)">
                <div class="previewRoot"></div>
                <div class="previewSecond previewSecond1"></div>
                <div class="previewSecond previewSecond2"></div>
                <div class="previewNode previewNode1"></div>
                <div class="previewNode previewNode2"></div>
              </div>
              <div class="themeName">{{ theme.name }}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Color from './Color.vue'
import { mapState } from 'vuex'
import {
  fontSizeList,
  lineWidthList,
  borderRadiusList,
  fontFamilyList,
  borderDasharrayList,
  lineStyleList,
  backgroundRepeatList,
  backgroundPositionList,
  backgroundSizeList,
  shapeList
} from '@/config'

const defaultTheme = {
  paddingX: 15,
  paddingY: 5,
  imgMaxWidth: 200,
  imgMaxHeight: 100,
  iconSize: 20,
  lineWidth: 1,
  lineColor: '#549688',
  lineDasharray: 'none',
  lineFlow: false,
  lineFlowDuration: 1,
  lineFlowForward: true,
  lineStyle: 'straight',
  rootLineKeepSameInCurve: true,
  rootLineStartPositionKeepSameInCurve: false,
  lineRadius: 5,
  showLineMarker: false,
  generalizationLineWidth: 1,
  generalizationLineColor: '#549688',
  generalizationLineMargin: 0,
  generalizationNodeMargin: 20,
  associativeLineWidth: 2,
  associativeLineColor: 'rgb(51, 51, 51)',
  associativeLineActiveWidth: 8,
  associativeLineActiveColor: 'rgba(2, 167, 240, 1)',
  associativeLineDasharray: '6,4',
  associativeLineTextColor: 'rgb(51, 51, 51)',
  associativeLineTextFontSize: 14,
  associativeLineTextLineHeight: 1.2,
  associativeLineTextFontFamily: '微软雅黑, Microsoft YaHei',
  backgroundColor: '#fafafa',
  backgroundImage: 'none',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  nodeUseLineStyle: false,
  root: {
    shape: 'rectangle',
    fillColor: '#549688',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    borderColor: 'transparent',
    borderWidth: 0,
    borderDasharray: 'none',
    borderRadius: 5,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#549688',
    endColor: '#fff',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  second: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 40,
    fillColor: '#fff',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#565656',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#549688',
    borderWidth: 1,
    borderDasharray: 'none',
    borderRadius: 5,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#549688',
    endColor: '#fff',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  node: {
    shape: 'rectangle',
    marginX: 50,
    marginY: 0,
    fillColor: 'transparent',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#6a6d6c',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    borderDasharray: 'none',
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#549688',
    endColor: '#fff',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  generalization: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 40,
    fillColor: '#fff',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#565656',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#549688',
    borderWidth: 1,
    borderDasharray: 'none',
    borderRadius: 5,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#549688',
    endColor: '#fff',
    startDir: [0, 0],
    endDir: [1, 0],
    hoverRectColor: '',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  }
}

const minimalistTheme = {
  paddingX: 15,
  paddingY: 5,
  imgMaxWidth: 200,
  imgMaxHeight: 100,
  iconSize: 20,
  lineWidth: 1,
  lineColor: '#9ca3af',
  lineDasharray: 'none',
  lineFlow: false,
  lineFlowDuration: 1,
  lineFlowForward: true,
  lineStyle: 'straight',
  rootLineKeepSameInCurve: true,
  rootLineStartPositionKeepSameInCurve: false,
  lineRadius: 5,
  showLineMarker: false,
  generalizationLineWidth: 1,
  generalizationLineColor: '#9ca3af',
  generalizationLineMargin: 0,
  generalizationNodeMargin: 20,
  associativeLineWidth: 2,
  associativeLineColor: '#6b7280',
  associativeLineActiveWidth: 8,
  associativeLineActiveColor: 'rgba(107, 114, 128, 1)',
  associativeLineDasharray: '6,4',
  associativeLineTextColor: '#6b7280',
  associativeLineTextFontSize: 14,
  associativeLineTextLineHeight: 1.2,
  associativeLineTextFontFamily: 'Arial, sans-serif',
  backgroundColor: '#ffffff',
  backgroundImage: 'none',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  nodeUseLineStyle: true,
  root: {
    shape: 'rectangle',
    fillColor: '#f3f4f6',
    fontFamily: 'Arial, sans-serif',
    color: '#1f2937',
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderDasharray: 'none',
    borderRadius: 4,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#f3f4f6',
    endColor: '#e5e7eb',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  second: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 40,
    fillColor: 'transparent',
    fontFamily: 'Arial, sans-serif',
    color: '#374151',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: 'transparent',
    borderWidth: 0,
    borderDasharray: 'none',
    borderRadius: 4,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#f3f4f6',
    endColor: '#e5e7eb',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  node: {
    shape: 'rectangle',
    marginX: 50,
    marginY: 0,
    fillColor: 'transparent',
    fontFamily: 'Arial, sans-serif',
    color: '#6b7280',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 4,
    borderDasharray: 'none',
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#f3f4f6',
    endColor: '#e5e7eb',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  generalization: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 40,
    fillColor: '#f9fafb',
    fontFamily: 'Arial, sans-serif',
    color: '#4b5563',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderDasharray: 'none',
    borderRadius: 4,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#f3f4f6',
    endColor: '#e5e7eb',
    startDir: [0, 0],
    endDir: [1, 0],
    hoverRectColor: '',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  }
}

const techTheme = {
  paddingX: 20,
  paddingY: 8,
  imgMaxWidth: 200,
  imgMaxHeight: 100,
  iconSize: 20,
  lineWidth: 2,
  lineColor: '#00ffff',
  lineDasharray: 'none',
  lineFlow: false,
  lineFlowDuration: 1,
  lineFlowForward: true,
  lineStyle: 'curve',
  rootLineKeepSameInCurve: true,
  rootLineStartPositionKeepSameInCurve: false,
  lineRadius: 5,
  showLineMarker: false,
  generalizationLineWidth: 2,
  generalizationLineColor: '#00ffff',
  generalizationLineMargin: 0,
  generalizationNodeMargin: 20,
  associativeLineWidth: 2,
  associativeLineColor: '#00d4ff',
  associativeLineActiveWidth: 8,
  associativeLineActiveColor: 'rgba(0, 212, 255, 1)',
  associativeLineDasharray: '10,5',
  associativeLineTextColor: '#00ffff',
  associativeLineTextFontSize: 14,
  associativeLineTextLineHeight: 1.2,
  associativeLineTextFontFamily: 'Consolas, monospace',
  backgroundColor: '#0a0a1a',
  backgroundImage: 'none',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  nodeUseLineStyle: false,
  root: {
    shape: 'rectangle',
    fillColor: '#1a1a2e',
    fontFamily: 'Consolas, monospace',
    color: '#00ffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    borderColor: '#00ffff',
    borderWidth: 2,
    borderDasharray: 'none',
    borderRadius: 8,
    textDecoration: 'none',
    gradientStyle: true,
    startColor: '#1a1a2e',
    endColor: '#16213e',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '#00ffff',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  second: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 40,
    fillColor: '#0f0f1e',
    fontFamily: 'Consolas, monospace',
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#00d4ff',
    borderWidth: 1,
    borderDasharray: 'none',
    borderRadius: 6,
    textDecoration: 'none',
    gradientStyle: true,
    startColor: '#0f0f1e',
    endColor: '#1a1a2e',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '#00d4ff',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  node: {
    shape: 'rectangle',
    marginX: 50,
    marginY: 0,
    fillColor: '#0a0a1a',
    fontFamily: 'Consolas, monospace',
    color: '#88ffff',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#00ffff',
    borderWidth: 1,
    borderRadius: 4,
    borderDasharray: 'none',
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#0a0a1a',
    endColor: '#0f0f1e',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '#00ffff',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  generalization: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 40,
    fillColor: '#1a1a2e',
    fontFamily: 'Consolas, monospace',
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#00ffff',
    borderWidth: 1,
    borderDasharray: 'none',
    borderRadius: 6,
    textDecoration: 'none',
    gradientStyle: true,
    startColor: '#1a1a2e',
    endColor: '#16213e',
    startDir: [0, 0],
    endDir: [1, 0],
    hoverRectColor: '#00ffff',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  }
}

const handDrawnTheme = {
  paddingX: 20,
  paddingY: 10,
  imgMaxWidth: 200,
  imgMaxHeight: 100,
  iconSize: 20,
  lineWidth: 3,
  lineColor: '#8B4513',
  lineDasharray: '8,3',
  lineFlow: false,
  lineFlowDuration: 1,
  lineFlowForward: true,
  lineStyle: 'curve',
  rootLineKeepSameInCurve: true,
  rootLineStartPositionKeepSameInCurve: false,
  lineRadius: 10,
  showLineMarker: false,
  generalizationLineWidth: 3,
  generalizationLineColor: '#8B4513',
  generalizationLineMargin: 0,
  generalizationNodeMargin: 20,
  associativeLineWidth: 2,
  associativeLineColor: '#A0522D',
  associativeLineActiveWidth: 8,
  associativeLineActiveColor: 'rgba(160, 82, 45, 1)',
  associativeLineDasharray: '6,4',
  associativeLineTextColor: '#8B4513',
  associativeLineTextFontSize: 14,
  associativeLineTextLineHeight: 1.2,
  associativeLineTextFontFamily: 'Comic Sans MS, cursive',
  backgroundColor: '#FFF8DC',
  backgroundImage: 'none',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  nodeUseLineStyle: false,
  root: {
    shape: 'rectangle',
    fillColor: '#FFE4C4',
    fontFamily: 'Comic Sans MS, cursive',
    color: '#8B4513',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'normal',
    borderColor: '#DEB887',
    borderWidth: 3,
    borderDasharray: 'none',
    borderRadius: 15,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#FFE4C4',
    endColor: '#FFDAB9',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '#DEB887',
    hoverRectRadius: 10,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  second: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 50,
    fillColor: '#FFFACD',
    fontFamily: 'Comic Sans MS, cursive',
    color: '#A0522D',
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#DEB887',
    borderWidth: 2,
    borderDasharray: 'none',
    borderRadius: 12,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#FFFACD',
    endColor: '#FFE4B5',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '#DEB887',
    hoverRectRadius: 10,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  node: {
    shape: 'rectangle',
    marginX: 50,
    marginY: 0,
    fillColor: '#FFFAF0',
    fontFamily: 'Comic Sans MS, cursive',
    color: '#CD853F',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#DEB887',
    borderWidth: 2,
    borderRadius: 10,
    borderDasharray: 'none',
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#FFFAF0',
    endColor: '#FFF5EE',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '#DEB887',
    hoverRectRadius: 10,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  generalization: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 50,
    fillColor: '#FFE4C4',
    fontFamily: 'Comic Sans MS, cursive',
    color: '#A0522D',
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#DEB887',
    borderWidth: 2,
    borderDasharray: 'none',
    borderRadius: 12,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#FFE4C4',
    endColor: '#FFDAB9',
    startDir: [0, 0],
    endDir: [1, 0],
    hoverRectColor: '#DEB887',
    hoverRectRadius: 10,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  }
}

const darkThemeTheme = {
  paddingX: 15,
  paddingY: 5,
  imgMaxWidth: 200,
  imgMaxHeight: 100,
  iconSize: 20,
  lineWidth: 1,
  lineColor: '#6366f1',
  lineDasharray: 'none',
  lineFlow: false,
  lineFlowDuration: 1,
  lineFlowForward: true,
  lineStyle: 'straight',
  rootLineKeepSameInCurve: true,
  rootLineStartPositionKeepSameInCurve: false,
  lineRadius: 5,
  showLineMarker: false,
  generalizationLineWidth: 1,
  generalizationLineColor: '#6366f1',
  generalizationLineMargin: 0,
  generalizationNodeMargin: 20,
  associativeLineWidth: 2,
  associativeLineColor: '#a5b4fc',
  associativeLineActiveWidth: 8,
  associativeLineActiveColor: 'rgba(99, 102, 241, 1)',
  associativeLineDasharray: '6,4',
  associativeLineTextColor: '#a5b4fc',
  associativeLineTextFontSize: 14,
  associativeLineTextLineHeight: 1.2,
  associativeLineTextFontFamily: 'Segoe UI, sans-serif',
  backgroundColor: '#1e1e2e',
  backgroundImage: 'none',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  nodeUseLineStyle: false,
  root: {
    shape: 'rectangle',
    fillColor: '#313244',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#cdd6f4',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    borderColor: '#6366f1',
    borderWidth: 2,
    borderDasharray: 'none',
    borderRadius: 8,
    textDecoration: 'none',
    gradientStyle: true,
    startColor: '#313244',
    endColor: '#45475a',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '#6366f1',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  second: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 40,
    fillColor: '#45475a',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#bac2de',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#89b4fa',
    borderWidth: 1,
    borderDasharray: 'none',
    borderRadius: 6,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#45475a',
    endColor: '#585b70',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '#89b4fa',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  node: {
    shape: 'rectangle',
    marginX: 50,
    marginY: 0,
    fillColor: '#585b70',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#a6adc8',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#b4befe',
    borderWidth: 0,
    borderRadius: 4,
    borderDasharray: 'none',
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#585b70',
    endColor: '#6c7086',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '#b4befe',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  generalization: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 40,
    fillColor: '#45475a',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#bac2de',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#89b4fa',
    borderWidth: 1,
    borderDasharray: 'none',
    borderRadius: 6,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#45475a',
    endColor: '#585b70',
    startDir: [0, 0],
    endDir: [1, 0],
    hoverRectColor: '#89b4fa',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  }
}

const rainbowTheme = {
  paddingX: 15,
  paddingY: 5,
  imgMaxWidth: 200,
  imgMaxHeight: 100,
  iconSize: 20,
  lineWidth: 2,
  lineColor: '#ec4899',
  lineDasharray: 'none',
  lineFlow: false,
  lineFlowDuration: 1,
  lineFlowForward: true,
  lineStyle: 'curve',
  rootLineKeepSameInCurve: true,
  rootLineStartPositionKeepSameInCurve: false,
  lineRadius: 10,
  showLineMarker: false,
  generalizationLineWidth: 2,
  generalizationLineColor: '#f472b6',
  generalizationLineMargin: 0,
  generalizationNodeMargin: 20,
  associativeLineWidth: 2,
  associativeLineColor: '#a855f7',
  associativeLineActiveWidth: 8,
  associativeLineActiveColor: 'rgba(168, 85, 247, 1)',
  associativeLineDasharray: '8,4',
  associativeLineTextColor: '#7c3aed',
  associativeLineTextFontSize: 14,
  associativeLineTextLineHeight: 1.2,
  associativeLineTextFontFamily: 'Arial, sans-serif',
  backgroundColor: '#fdf4ff',
  backgroundImage: 'none',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  nodeUseLineStyle: false,
  root: {
    shape: 'rectangle',
    fillColor: '#ef4444',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'normal',
    borderColor: '#dc2626',
    borderWidth: 0,
    borderDasharray: 'none',
    borderRadius: 12,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#ef4444',
    endColor: '#dc2626',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '#fca5a5',
    hoverRectRadius: 10,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  second: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 50,
    fillColor: '#f97316',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    borderColor: '#ea580c',
    borderWidth: 0,
    borderDasharray: 'none',
    borderRadius: 10,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#f97316',
    endColor: '#ea580c',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '#fdba74',
    hoverRectRadius: 10,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  node: {
    shape: 'rectangle',
    marginX: 50,
    marginY: 0,
    fillColor: '#22c55e',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    borderColor: '#16a34a',
    borderWidth: 0,
    borderRadius: 8,
    borderDasharray: 'none',
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#22c55e',
    endColor: '#16a34a',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '#86efac',
    hoverRectRadius: 10,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  generalization: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 50,
    fillColor: '#8b5cf6',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    borderColor: '#7c3aed',
    borderWidth: 0,
    borderDasharray: 'none',
    borderRadius: 10,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#8b5cf6',
    endColor: '#7c3aed',
    startDir: [0, 0],
    endDir: [1, 0],
    hoverRectColor: '#c4b5fd',
    hoverRectRadius: 10,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  }
}

const NodeStyleEditor = {
  name: 'NodeStyleEditor',
  components: { Color },
  props: {
    nodeStyle: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isDark() {
      return this.$store.state.localConfig.isDark
    },
    fontFamilyList() {
      return fontFamilyList[this.$i18n.locale] || fontFamilyList.zh
    },
    borderDasharrayList() {
      return borderDasharrayList[this.$i18n.locale] || borderDasharrayList.zh
    },
    shapeList() {
      return shapeList[this.$i18n.locale] || shapeList.zh
    }
  },
  methods: {
    updateNodeStyle(prop, value) {
      this.$emit('update', { prop, value })
    }
  },
  template: `
    <div class="nodeStyleEditor">
      <div class="formRow">
        <span class="label">{{ $t('theme.nodeShape') }}</span>
        <el-select size="mini" style="width: 120px" :value="nodeStyle.shape" @change="(val) => updateNodeStyle('shape', val)">
          <el-option v-for="item in shapeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="formRow">
        <span class="label">{{ $t('theme.fillColor') }}</span>
        <span class="colorBlock" :style="{ backgroundColor: nodeStyle.fillColor }" @click="$refs.fillColorPopover.showPopper = true"></span>
        <el-popover ref="fillColorPopover" placement="bottom" trigger="manual">
          <Color :color="nodeStyle.fillColor" @change="(val) => updateNodeStyle('fillColor', val)"></Color>
        </el-popover>
      </div>
      <div class="formRow">
        <span class="label">{{ $t('theme.fontFamily') }}</span>
        <el-select size="mini" style="width: 120px" :value="nodeStyle.fontFamily" @change="(val) => updateNodeStyle('fontFamily', val)">
          <el-option v-for="item in fontFamilyList" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="formRow">
        <span class="label">{{ $t('theme.fontSize') }}</span>
        <el-select size="mini" style="width: 80px" :value="nodeStyle.fontSize" @change="(val) => updateNodeStyle('fontSize', val)">
          <el-option v-for="item in fontSizeList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="formRow">
        <span class="label">{{ $t('theme.textColor') }}</span>
        <span class="colorBlock" :style="{ backgroundColor: nodeStyle.color }" @click="$refs.textColorPopover.showPopper = true"></span>
        <el-popover ref="textColorPopover" placement="bottom" trigger="manual">
          <Color :color="nodeStyle.color" @change="(val) => updateNodeStyle('color', val)"></Color>
        </el-popover>
      </div>
      <div class="formRow">
        <span class="label">{{ $t('theme.borderColor') }}</span>
        <span class="colorBlock" :style="{ backgroundColor: nodeStyle.borderColor }" @click="$refs.borderColorPopover.showPopper = true"></span>
        <el-popover ref="borderColorPopover" placement="bottom" trigger="manual">
          <Color :color="nodeStyle.borderColor" @change="(val) => updateNodeStyle('borderColor', val)"></Color>
        </el-popover>
      </div>
      <div class="formRow">
        <span class="label">{{ $t('theme.borderWidth') }}</span>
        <el-select size="mini" style="width: 80px" :value="nodeStyle.borderWidth" @change="(val) => updateNodeStyle('borderWidth', val)">
          <el-option v-for="item in lineWidthList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="formRow">
        <span class="label">{{ $t('theme.borderRadius') }}</span>
        <el-select size="mini" style="width: 80px" :value="nodeStyle.borderRadius" @change="(val) => updateNodeStyle('borderRadius', val)">
          <el-option v-for="item in borderRadiusList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="formRow">
        <span class="label">{{ $t('theme.gradientStyle') }}</span>
        <el-switch :value="nodeStyle.gradientStyle" @change="(val) => updateNodeStyle('gradientStyle', val)"></el-switch>
      </div>
      <div class="formRow" v-if="nodeStyle.gradientStyle">
        <span class="label">{{ $t('theme.startColor') }}</span>
        <span class="colorBlock" :style="{ backgroundColor: nodeStyle.startColor }" @click="$refs.startColorPopover.showPopper = true"></span>
        <el-popover ref="startColorPopover" placement="bottom" trigger="manual">
          <Color :color="nodeStyle.startColor" @change="(val) => updateNodeStyle('startColor', val)"></Color>
        </el-popover>
      </div>
      <div class="formRow" v-if="nodeStyle.gradientStyle">
        <span class="label">{{ $t('theme.endColor') }}</span>
        <span class="colorBlock" :style="{ backgroundColor: nodeStyle.endColor }" @click="$refs.endColorPopover.showPopper = true"></span>
        <el-popover ref="endColorPopover" placement="bottom" trigger="manual">
          <Color :color="nodeStyle.endColor" @change="(val) => updateNodeStyle('endColor', val)"></Color>
        </el-popover>
      </div>
    </div>
  `
}

export default {
  components: {
    Sidebar,
    Color,
    NodeStyleEditor
  },
  props: {
    data: {
      type: [Object, null],
      default: null
    },
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      activeTab: 'background',
      nodeTab: 'root',
      themeConfig: this.deepClone(defaultTheme),
      originalConfig: this.deepClone(defaultTheme),
      fontSizeList,
      lineWidthList,
      borderRadiusList,
      customThemes: [
        { name: '简约风', value: 'minimalist', theme: minimalistTheme },
        { name: '科技风', value: 'tech', theme: techTheme },
        { name: '手绘风', value: 'handDrawn', theme: handDrawnTheme },
        { name: '深色主题', value: 'darkTheme', theme: darkThemeTheme },
        { name: '彩虹主题', value: 'rainbow', theme: rainbowTheme }
      ],
      themePreviewStyles: {
        minimalist: {
          bg: '#ffffff',
          root: '#f3f4f6',
          rootText: '#1f2937',
          second: '#e5e7eb',
          node: '#f9fafb',
          line: '#9ca3af'
        },
        tech: {
          bg: '#0a0a1a',
          root: '#1a1a2e',
          rootText: '#00ffff',
          second: '#0f0f1e',
          node: '#0a0a1a',
          line: '#00ffff'
        },
        handDrawn: {
          bg: '#FFF8DC',
          root: '#FFE4C4',
          rootText: '#8B4513',
          second: '#FFFACD',
          node: '#FFFAF0',
          line: '#8B4513'
        },
        darkTheme: {
          bg: '#1e1e2e',
          root: '#313244',
          rootText: '#cdd6f4',
          second: '#45475a',
          node: '#585b70',
          line: '#6366f1'
        },
        rainbow: {
          bg: '#fdf4ff',
          root: '#ef4444',
          rootText: '#ffffff',
          second: '#f97316',
          node: '#22c55e',
          line: '#ec4899'
        }
      }
    }
  },
  computed: {
    ...mapState({
      isDark: state => state.localConfig.isDark,
      activeSidebar: state => state.activeSidebar
    }),
    fontFamilyList() {
      return fontFamilyList[this.$i18n.locale] || fontFamilyList.zh
    },
    borderDasharrayList() {
      return borderDasharrayList[this.$i18n.locale] || borderDasharrayList.zh
    },
    lineStyleList() {
      return lineStyleList[this.$i18n.locale] || lineStyleList.zh
    },
    backgroundRepeatList() {
      return backgroundRepeatList[this.$i18n.locale] || backgroundRepeatList.zh
    },
    backgroundPositionList() {
      return backgroundPositionList[this.$i18n.locale] || backgroundPositionList.zh
    },
    backgroundSizeList() {
      return backgroundSizeList[this.$i18n.locale] || backgroundSizeList.zh
    },
    shapeList() {
      return shapeList[this.$i18n.locale] || shapeList.zh
    }
  },
  watch: {
    activeSidebar(val) {
      if (val === 'themeEditor') {
        this.initThemeConfig()
        this.$refs.sidebar.show = true
      } else {
        this.$refs.sidebar.show = false
      }
    }
  },
  created() {
    this.initThemeConfig()
  },
  methods: {
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj))
    },

    initThemeConfig() {
      const customConfig = this.mindMap.getCustomThemeConfig()
      if (Object.keys(customConfig).length > 0) {
        this.themeConfig = this.deepMerge(this.deepClone(defaultTheme), customConfig)
      } else {
        this.themeConfig = this.deepClone(defaultTheme)
      }
      this.originalConfig = this.deepClone(this.themeConfig)
    },

    deepMerge(target, source) {
      for (const key in source) {
        if (source[key] instanceof Object && key in target) {
          Object.assign(source[key], this.deepMerge(target[key], source[key]))
        }
      }
      Object.assign(target || {}, source)
      return target
    },

    updateConfig(prop, value) {
      this.themeConfig[prop] = value
      this.applyThemeConfig()
    },

    updateNodeStyle(nodeType, { prop, value }) {
      this.themeConfig[nodeType][prop] = value
      this.applyThemeConfig()
    },

    applyThemeConfig() {
      this.mindMap.setThemeConfig(this.themeConfig, true)
    },

    exportTheme() {
      const themeData = {
        name: 'Custom Theme',
        version: '1.0',
        createdAt: new Date().toISOString(),
        config: this.deepClone(this.themeConfig)
      }
      const jsonStr = JSON.stringify(themeData, null, 2)
      const blob = new Blob([jsonStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'custom-theme.json'
      a.click()
      URL.revokeObjectURL(url)
      this.$message.success(this.$t('theme.exportSuccess'))
    },

    triggerImport() {
      this.$refs.importInput.click()
    },

    handleImport(event) {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = e => {
        try {
          const data = JSON.parse(e.target.result)
          if (data.config) {
            this.themeConfig = this.deepClone(data.config)
            this.applyThemeConfig()
            this.$message.success(this.$t('theme.importSuccess'))
          } else {
            this.$message.error(this.$t('theme.fileFormatError'))
          }
        } catch (err) {
          this.$message.error(this.$t('theme.fileFormatError'))
        }
      }
      reader.readAsText(file)
      event.target.value = ''
    },

    resetTheme() {
      this.themeConfig = this.deepClone(this.originalConfig)
      this.applyThemeConfig()
    },

    getPreviewStyle(themeValue) {
      const style = this.themePreviewStyles[themeValue]
      return {
        backgroundColor: style.bg
      }
    },

    applyCustomTheme(theme) {
      this.themeConfig = this.deepClone(theme.theme)
      this.applyThemeConfig()
      this.$message.success(`已应用 ${theme.name} 主题`)
    }
  }
}
</script>

<style lang="less" scoped>
.themeEditor {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &.isDark {
    .toolbar {
      background-color: #1e1e2e;
    }

    .sectionContent {
      .label {
        color: hsla(0, 0%, 100%, 0.6);
      }
    }

    .themeMarket {
      .themeName {
        color: #fff;
      }
    }

    /deep/ .el-tabs__item {
      color: hsla(0, 0%, 100%, 0.6);

      &.is-active {
        color: #409eff;
      }
    }

    /deep/ .el-tabs__nav-wrap::after {
      background-color: hsla(0, 0%, 100%, 0.1);
    }
  }

  .toolbar {
    display: flex;
    gap: 10px;
    padding: 10px 15px;
    background-color: #f5f7fa;
    flex-shrink: 0;
  }

  .editorTabs {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    /deep/ .el-tabs__content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

  .sectionContent {
    padding: 15px;

    .formRow {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .label {
        min-width: 100px;
        font-size: 13px;
        color: #606266;
      }

      .colorBlock {
        width: 30px;
        height: 30px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}

.nodeStyleEditor {
  padding: 10px 0;

  .formRow {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    .label {
      min-width: 100px;
      font-size: 13px;
      color: #606266;
    }

    .colorBlock {
      width: 30px;
      height: 30px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}

.themeMarket {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 15px;

  .marketItem {
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    .themePreview {
      height: 120px;
      position: relative;
      overflow: hidden;

      .previewRoot {
        position: absolute;
        top: 50%;
        left: 20%;
        transform: translateY(-50%);
        width: 60px;
        height: 30px;
        background-color: inherit;
        border-radius: 4px;
      }

      .previewSecond {
        position: absolute;
        width: 50px;
        height: 25px;
        border-radius: 4px;
      }

      .previewSecond1 {
        top: 25%;
        left: 50%;
      }

      .previewSecond2 {
        top: 65%;
        left: 50%;
      }

      .previewNode {
        position: absolute;
        width: 40px;
        height: 20px;
        border-radius: 3px;
      }

      .previewNode1 {
        top: 15%;
        left: 75%;
      }

      .previewNode2 {
        top: 75%;
        left: 75%;
      }
    }

    .themeName {
      text-align: center;
      padding: 8px;
      font-size: 14px;
      background-color: #f5f7fa;
    }
  }
}
</style>
