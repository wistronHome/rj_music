"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by GyjLoveLh on  2018/2/20
 */
const TYPES = {
    language: [
        { key: '000001', label: '华语' },
        { key: '000002', label: '欧美' },
        { key: '000003', label: '日语' },
        { key: '000004', label: '韩语' },
        { key: '000005', label: '粤语' },
        { key: '000006', label: '小语种' }
    ],
    freestyle: [
        { key: '000100', label: '流行' },
        { key: '000101', label: '摇滚' },
        { key: '000102', label: '民谣' },
        { key: '000103', label: '电子' },
        { key: '000104', label: '舞曲' },
        { key: '000105', label: '说唱' },
        { key: '000106', label: '爵士' },
        { key: '000107', label: '乡村' },
        { key: '000108', label: 'R&B/Soul' },
        { key: '000109', label: '古典' },
        { key: '000110', label: '民族' },
        { key: '000111', label: '英伦' },
        { key: '000112', label: '金属' },
        { key: '000113', label: '轻音乐' }
    ],
    emotion: [
        { key: '010001', label: '怀旧' },
        { key: '010002', label: '清新' },
        { key: '010003', label: '浪漫' },
        { key: '010004', label: '性感' },
        { key: '010005', label: '伤感' },
        { key: '010006', label: '治愈' },
        { key: '010007', label: '放松' },
        { key: '010008', label: '孤独' },
        { key: '010009', label: '感动' },
        { key: '010010', label: '兴奋' },
        { key: '010011', label: '快乐' },
        { key: '010012', label: '安静' },
        { key: '010013', label: '思念' }
    ]
};
exports.PLAYLIST_TYPES = [
    { type: 'language', label: '语种', children: TYPES.language },
    { type: 'freestyle', label: '风格', children: TYPES.freestyle },
    { type: 'emotion', label: '情感', children: TYPES.emotion }
];
